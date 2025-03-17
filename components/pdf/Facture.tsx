import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import pdfStyle from "./pdfStyle";
import { labels, RIB, TVA, packages } from "@/constants";
import { Facture } from "@/types";

type Props = {
    factureData: Facture;
};

const FacturePDF = (props: Props): JSX.Element => {
    const { factureData } = props;

    const currentPackage = packages[factureData.client.currentPackageId]

    const quantity = (): number => {
        if (factureData.client.currentPeriod === "annual") return 12;
        else return 1;
    }

    const totalHT = quantity() * currentPackage.price;

    const actualYear = new Date().getFullYear();
    const formattedFirstMonth = factureData.client.currentPeriodStart.toString().padStart(2, "0");
    const endMonth = factureData.client.currentPeriodStart === 12 ? 1 : factureData.client.currentPeriodStart;
    const endYear = factureData.client.currentPeriod === "annual" ? actualYear + 1 : (factureData.client.currentPeriodStart === 12 ? actualYear + 1 : actualYear);
    const formattedEndMonth = endMonth.toString().padStart(2, "0");

    const facturationPeriod = (): string => {
        if (factureData.client.currentPeriod === "annual") return `(période : ${formattedFirstMonth}/${actualYear} > ${formattedEndMonth}/${endYear})`;
        else return `(période : ${formattedFirstMonth}/${actualYear})`;
    }


    return (
        <Document>
            <Page size="A4" style={pdfStyle.page}>
                {/* HEADER */}
                <View style={pdfStyle.titleContainer}>
                    <Text style={pdfStyle.title}>Facture n°</Text>
                    <Text style={pdfStyle.title}>{factureData.id}</Text>
                </View>

                <View style={pdfStyle.labelsContainer}>
                    <Image
                        src="/images/icons/logo-facture.jpg"
                        style={{ width: 50, height: 75 }}
                    />
                    <View style={pdfStyle.labels}>
                        <Text style={pdfStyle.labelsText}>{labels.society}</Text>
                        <Text style={pdfStyle.labelsText}>{labels.adress.line1}</Text>
                        {labels.adress.line2 && (
                            <Text style={pdfStyle.labelsText}>{labels.adress.line2}</Text>
                        )}
                        <Text style={pdfStyle.labelsText}>
                            {labels.adress.code} {labels.adress.city}
                        </Text>
                        <Text style={pdfStyle.labelsText}>SIRET: {labels.siret}</Text>
                    </View>
                </View>

                {/* INFOS CLIENT */}
                <View style={pdfStyle.clientContainer}>
                    <Text style={pdfStyle.clientLine}>{factureData.client.name}</Text>
                    {factureData.client.adress && (
                        <>
                            <Text style={pdfStyle.clientLine}>
                                {factureData.client.adress.line1}
                            </Text>
                            {factureData.client.adress.line2 && (
                                <Text style={pdfStyle.clientLine}>
                                    {factureData.client.adress.line2}
                                </Text>
                            )}
                            <Text style={pdfStyle.clientLine}>
                                {factureData.client.adress.code} {factureData.client.adress.city}
                            </Text>
                            {factureData.client.phone && (
                                <Text style={pdfStyle.clientLine}>
                                    tel: {factureData.client.phone}
                                </Text>
                            )}
                            {factureData.client.mail && (
                                <Text style={pdfStyle.clientLine}>
                                    mail: {factureData.client.mail}
                                </Text>
                            )}
                        </>
                    )}
                </View>

                <Text style={pdfStyle.subTitle}>Facture du {formattedFirstMonth}/{actualYear}</Text>

                {/* TABLEAU DE FACTURE */}
                <View style={pdfStyle.tableContainer}>
                    {/* En-tête du tableau */}
                    <View style={pdfStyle.tableHeader}>
                        <Text style={[pdfStyle.tableDescription, pdfStyle.tableCell]}>Description</Text>
                        <Text style={[pdfStyle.tableQuantity, pdfStyle.tableCell]}>Quantité</Text>
                        <Text style={[pdfStyle.tablePrice, pdfStyle.tableCell]}>Prix unitaire (HT)</Text>
                        <Text style={[pdfStyle.tableTotal, pdfStyle.tableCell]}>Total (HT)</Text>
                    </View>

                    {/* Lignes du tableau */}
                    <View style={pdfStyle.tableRow}>
                        <Text style={[pdfStyle.tableDescription, pdfStyle.tableCell]}>
                            {`Forfait 'Guild' : `} 
                            {currentPackage.rules.min} à {currentPackage.rules.max}
                            {' users '}{facturationPeriod()}
                        </Text>
                        <Text style={[pdfStyle.tableQuantity, pdfStyle.tableCell]}>{quantity()}</Text>
                        <Text style={[pdfStyle.tablePrice, pdfStyle.tableCell]}>{currentPackage.price.toFixed(2)}€</Text>
                        <Text style={[pdfStyle.tableTotal, pdfStyle.tableCell]}>{totalHT.toFixed(2)}€</Text>
                    </View>

                    {/* Total HT */}
                    <View style={pdfStyle.tableFooter}>
                        <Text style={[pdfStyle.footerLabel]}>Total HT:</Text>
                        <Text style={[pdfStyle.footerValue, pdfStyle.tableCell]}>{totalHT.toFixed(2)}€</Text>
                    </View>

                    {/* TVA et Total TTC */}
                    <View style={pdfStyle.tableFooter}>
                        <Text style={pdfStyle.footerLabel}>TVA ({TVA * 100} %):</Text>
                        <Text style={[pdfStyle.footerValue, pdfStyle.tableCell]}>
                            {(totalHT * TVA).toFixed(2)}€
                        </Text>
                    </View>

                    <View style={pdfStyle.tableFooter}>
                        <Text style={[pdfStyle.footerLabel, pdfStyle.tableFinalTotal]}>Total TTC:</Text>
                        <Text style={[pdfStyle.footerValue, pdfStyle.tableCell, pdfStyle.tableFinalTotal]}>
                            {(totalHT * (1 + TVA)).toFixed(2)}€
                        </Text>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={pdfStyle.footer}>
                    <View style={pdfStyle.footerCols}>
                        <Text style={pdfStyle.footerText}>SIRET : {labels.siret}</Text>
                        <Text style={pdfStyle.footerText}>contact: {labels.mail}</Text>
                    </View>
                    <View style={pdfStyle.footerCols}>
                        <Text style={pdfStyle.footerText}>IBAN : {RIB.IBAN}</Text>
                        <Text style={pdfStyle.footerText}>BIC : {RIB.BIC}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default FacturePDF;

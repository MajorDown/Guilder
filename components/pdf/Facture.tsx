import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import pdfStyle from "./pdfStyle";
import { labels, TVA } from "@/constants";
import { Facture } from "@/types";

type Props = {
    factureData: Facture;
};

const FacturePDF = (props: Props): JSX.Element => {
    const { factureData } = props;

    const totalHT = 1 * factureData.package.price;

    const actualYear = new Date().getFullYear();
    const formattedFirstMonth = factureData.firstMonth.toString().padStart(2, "0");
    const endMonth = factureData.firstMonth === 12 ? 1 : factureData.firstMonth + 1;
    const endYear = factureData.period === "annual" ? actualYear + 1 : (factureData.firstMonth === 12 ? actualYear + 1 : actualYear);
    const formattedEndMonth = endMonth.toString().padStart(2, "0");   
    const facturationPeriod: string = 
        `(période : ${formattedFirstMonth}/${actualYear} > ${formattedEndMonth}/${endYear})`;

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
                    <Text style={pdfStyle.clientLine}>
                        Client: {factureData.client.name}
                    </Text>
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
                            {props.factureData.package.rules.min} à {props.factureData.package.rules.max}
                            {' users '}{facturationPeriod}
                        </Text>
                        <Text style={[pdfStyle.tableQuantity, pdfStyle.tableCell]}>1</Text>
                        <Text style={[pdfStyle.tablePrice, pdfStyle.tableCell]}>{props.factureData.package.price.toFixed(2)}€</Text>
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
            </Page>
        </Document>
    );
};

export default FacturePDF;

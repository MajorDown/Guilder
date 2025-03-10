import {Page, Text, View, Document} from '@react-pdf/renderer';
import pdfStyle from './pdfStyle';
import { labels, TVA, packages } from '@/constants';
import { Facture } from '@/types';

type Props = {
    factureData: Facture
}

const FacturePDF = (props: Props):JSX.Element => {
    return (<Document>
        <Page size="A4" style={pdfStyle.page}>
            <Text style={pdfStyle.title}>Facture n°{props.factureData.id}</Text>
            <View style={pdfStyle.labels}>
                <Text style={pdfStyle.labelsText}>{labels.society}</Text>
                <Text style={pdfStyle.labelsText}>{labels.adress.line1}</Text>
                {labels.adress.line2 && <Text style={pdfStyle.labelsText}>{labels.adress.line2}</Text>}
                <Text style={pdfStyle.labelsText}>{labels.adress.code} {labels.adress.city}</Text>
                <Text style={pdfStyle.labelsText}>SIRET: {labels.siret}</Text>
            </View>
        </Page>
    </Document>);
}

export default FacturePDF;
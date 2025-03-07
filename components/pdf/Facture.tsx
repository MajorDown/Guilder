import {Page, Text, View, Document} from '@react-pdf/renderer';
import pdfStyle from './pdfStyle';

const Facture = ():JSX.Element => {
    return (<Document>
        <Page size="A4" style={pdfStyle.page}>
            <View>
                <Text>Facture</Text>
            </View>
        </Page>
    </Document>);
}

export default Facture;
import {StyleSheet} from '@react-pdf/renderer';

const pdfStyle = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleContainer: {
        position: 'absolute',
        top: 50,
        right: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    subTitle: {
        position: 'absolute',
        top : 270,
        left: 20,
        fontSize: 15,
        textAlign: 'center',
    },
    labelsContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
        display : 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10

    },
    labels: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    labelsText: {
        fontSize: 15,
        textAlign: 'center',
    },
    clientContainer: {
        position: 'absolute',
        top: 150,
        right: 20,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    },
    clientLine: {
        fontSize: 15,
        textAlign: 'left',
    },
    tableContainer: {
        position: 'absolute',
        top: 300,
        left: 20,
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        width: '100%',
    },
    tableRow: {
        flexDirection: "row",
        width: '100%',
    },
    tableCell: {
        padding: 5,
        fontSize: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
    },
    tableDescription: {
        width: '60%',
    },
    tableQuantity: {
        width: '10%',
    },
    tablePrice: {
        width: '15%',
    },
    tableTotal: {
        width: '15%',
    },
    tableFooter: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'flex-end',
    },
    footerLabel: {
        fontSize: 10,
        padding: 5,
    },
    footerValue: {
        width: '15%',
    },
    tableFinalTotal: {
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 50
    },
    footerCols: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    footerText: {
        fontSize: 10,
    },
});

export default pdfStyle;
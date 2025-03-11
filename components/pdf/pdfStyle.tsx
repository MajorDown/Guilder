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
        top: 30,
        right: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
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
        top: 270,
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
        padding: 5
    },
    tableDescription: {
        width: '55%',
        fontSize: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
    },
    tableQuantity: {
        width: '10%',
        fontSize: 10,
        textAlign: 'center',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
    },
    tablePrice: {
        width: '20%',
        fontSize: 10,
        textAlign: 'center',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
    },
    tableTotal: {
        width: '15%',
        fontSize: 10,
        textAlign: 'center',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
    },
});

export default pdfStyle;
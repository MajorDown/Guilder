import {StyleSheet} from 'react-native';

const pdfStyle = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    title: {},
    labels: {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    labelsText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default pdfStyle;
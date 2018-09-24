class Utils {

    /**
     * Classe para formatação de datas
     */
    static dateFormat(date) {

        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-Br');

    }

}
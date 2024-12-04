<script>
export default {
    name: "AppTable",
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        header: {
            type: String,
            required: true
        },
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        isColorColumn(column) {
            return column === 'color';
        },
    },
};
</script>

<template>
    <table>
        <caption>{{ header }}</caption>
        <thead>
            <tr>
                <th v-for="(column, columnIdx) in columns" :key="columnIdx">{{ capitalizeFirstLetter(column) }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, dataIdx) in data" :key="dataIdx">
                <td :style="{ background: isColorColumn(column) ? data[column] : undefined }"
                    v-for="(column, columnIdx) in columns" :key="columnIdx">{{
                        isColorColumn(column) ?
                            '' : data[column] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
    background-color: #fefefe;
    z-index: 9999;
}

td,
th {
    padding: 5px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #efefef;
    font-weight: bold;
}

caption {
    background-color: darkgreen;
    color: white;
    position: sticky;
    top: 0;
}

thead {
    position: sticky;
    top: 18px;
}

table tr:hover {
    background-color: #efefef;
    transition: background-color 0.3s ease;
}
</style>
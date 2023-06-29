<template>
    <div style="margin-bottom:0px;padding:0 0 0 120px">
        <p>{{row.jdbcUrl}}</p>
        <Divider />
        <p>{{row.sql}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
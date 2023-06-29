<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="(item, index) in routeNames" :key="index">{{$t('main.' + item.meta.globalName)}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  data () {
    return {
      routeNames: []
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler (to, from) {
        this.routeNames = to.matched.slice(1, to.matched.length)
      }
    }
  }
}
</script>

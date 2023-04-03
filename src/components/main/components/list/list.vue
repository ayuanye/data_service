<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <span>监控台</span>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          实时监控<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">我的快照</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // ...mapActions([
    //   'handleLogOut'
    // ]),
    logout () {
      // this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      // })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-avatar-dropdown{
  color: aliceblue;
}
</style>

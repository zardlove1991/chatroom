export const Socket = {
    data() {
      return {
        ws: ''
      };
    },
    beforeCreate() {
    },
    created() {
        this.ws = new WebSocket('ws:localhost:8080')
        this.ws.addEventListener('open', this.handleOpen.bind(this), false)
        this.ws.addEventListener('close', this.handleClose.bind(this), false)
        this.ws.addEventListener('error', this.handleError.bind(this), false)
    },
    mounted() {
      this.ws.addEventListener('message', this.handleMessage.bind(this), false)
    },
    methods: {
      handleOpen(e) {
        console.log('WebSocket opened', e)
      },
      handleClose(e) {
        console.log('WebSocket closed', e)
      },
      handleError(e) {
        console.log('WebSocket error', e)
      },
      handleMessage(e, data) {
        console.log(this.$refs);
        setTimeout(() => {
          const { IMUI } = this.$refs;
          console.log(this.user.id)
          console.log(e, '来自服务端的数据')
          let msg = JSON.parse(e.data);
          msg.status = 'succeed'
          console.log(msg);
          IMUI.appendMessage(msg);
        }, 1000)
        // if (this.user.id == msg.fromUser.id) {
        //   IMUI.updateMessage(msg);
        // } else {
        //   console.log('heihei')
        //   IMUI.appendMessage(msg);
        // }
      }
    }
  };
  
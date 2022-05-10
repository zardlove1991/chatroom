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
        this.ws.addEventListener('message', this.handleMessage.bind(this), false)
    },
    mounted() {
  
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
        
      }
    }
  };
  
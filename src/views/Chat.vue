<template>
<div>
    <lemon-imui ref="IMUI" :user="this.user" class="chat"/>
</div>
</template>

<script>
import { getItem } from '@/utils/storage';
import 'lemon-imui/dist/index.css';
import { Socket } from '@/mixins/socket.js';
export default {
    mixins: [Socket],
    data() {
        return {
            AddressList: []
        }
    },
    computed: {
        user() {
            const userInfo = getItem('userInfo');
            return {
                id: userInfo.id,
                displayName: userInfo.username,
                avatar: userInfo.avatar || ''
            }
        }
    },
    created() {
      
    },
    mounted() {
       this.getMemberList(); 
    },
    methods: {
        getMemberList() {
            const { IMUI } = this.$refs;
            this.$minApi.memberList().then((res) => {
                console.log(res.list);
                res.list.forEach((item, index) => {
                    if (item._id != this.user.id) {
                        let connect = {
                            id: item._id,
                            displayName: item.username,
                            avatar:'',
                            index: 'L',
                            unread: 0,
                            //最近一条消息的内容，如果值为空，不会出现在“聊天”列表里面。
                            //lastContentRender 函数会将 file 消息转换为 '[文件]', image 消息转换为 '[图片]'，对 text 会将文字里的表情标识替换为img标签,
                            // lastContent: IMUI.lastContentRender({type:'text',content:'你在干嘛呢？'}),
                            //最近一条消息的发送时间
                            // lastSendTime: 1566047865417,
                        }
                        this.AddressList.push(connect);
                        console.log(this.AddressList);
                        IMUI.initContacts(this.AddressList);
                    }
                })
            })
        }
    }
}
</script>
<style lang='scss' scoped>
    .chat {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
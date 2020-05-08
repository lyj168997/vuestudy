<template>
    <div class="content">
        <b>裁剪插件上传图片</b>
        <input type="file" accept="image/*" @change="uploadImg" ref="uploadavatar"/>
        <img :src="croppersrc"/>
         <!-- 裁剪框 -->
        <div id="cropperModel" class="cropperModel" v-show="show">
            <div class="img-container" >
                <img src="" ref="cropperImg"/>
            </div>
            <div class="alertbtn flexbox">
                <span id="cancle_alert" @click="cancleAvatar">取消</span>
                <span id="upload_saveBtn" data-method="getCroppedCanvas" @click="saveAvatar">保存</span>
            </div>
	    </div>
    </div>
</template>
<script>
import Cropper from 'cropperjs';//裁剪
import 'cropperjs/dist/cropper.css';
export default {
    data(){
        return {
            show:false,//裁剪弹框显示状态
            $image:null,//图片dom
            aCropper:null,//裁剪
            avatarname:'',//更新头像名称
            croppersrc:''
        }
    },
    mounted(){
        this.initCropper();
    },
    methods:{
        /* 初始化裁剪框 */
        initCropper(){
            var image = this.$refs.cropperImg;  
            this.$image=$(image);
            let cropper = new Cropper(image, {
                viewMode: 1,
                dragMode: 'none',
                initialAspectRatio: 1,
                aspectRatio: 1,
                preview: '.before',
                background: false,
                autoCropArea: 0.6,
                zoomOnWheel: false,
            });
            this.aCropper=cropper;
        },
        uploadImg(e){
            let URL = window.URL || window.webkitURL,
                blobURL;
            
            let file = e.currentTarget.files[0];
            if (file) {
                blobURL = URL.createObjectURL(file);
                this.aCropper.replace(blobURL); 
                $(this.$refs.uploadavatar).val('');
                this.show=true;
                this.avatarname=file.name;
            }
        },
        cancleAvatar(){
            this.show=false;
        },
        saveAvatar(){
             let result=this.aCropper.getCroppedCanvas();
            let image = new Image();
            image.crossOrigin = "anonymous"; //关键
            image.src = result.toDataURL("image/jpeg");
            this.croppersrc=image.src;
            // 裁剪完的图片
            var data = result.toDataURL();
            
            let blob=this.dataURLtoBlob(data);
            //上传到后台
            // let fd=new FormData();
            // fd.append('uploadFile',blob,this.avatarname+'.jpg');
             this.show=false;
        },
        /* base64转blob */
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    padding:16px;
    font-size:14px;
    line-height: 32px;
    .cropperModel{
        width:100%;
        height:100%;
        background:#000;
        position:fixed;
        top:0;
        left:0;
        z-index:10000;
        .img-container{
            width:100%;
            height:calc(100% - 50px);
        }
        .img-container img{
            max-width:100%;
        }
        .alertbtn{
            height:50px;
            line-height: 50px;
            color:#fff;
            font-size: 16px;
            justify-content: space-between;
            span{
                padding:0 14px;
            }
        }
    }
}
</style>
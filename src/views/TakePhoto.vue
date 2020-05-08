<template>
    <div class="content">
        移动端拍照上传图片翻转问题
        <input type="file" accept="image/*" @change="uploadImg"/>
    </div>
</template>
<script>
import {EXIF} from 'exif-js';//旋转图片
export default {
    methods:{
         /* 上传图片 */
         uploadImg(event){
            // this.uploadCom(e,'/wx/uploadimg');
           var file = event.currentTarget.files['0'];
            //图片方向角 added by lzk  
            var Orientation = null;
            let _this=this;
            if (file) {
                //获取照片方向角属性，用户旋转控制  
                EXIF.getData(file, function() {
                    EXIF.getAllTags(this);
                    Orientation = EXIF.getTag(this, 'Orientation');
                });
                var oReader = new FileReader();
                let blob;
                oReader.readAsDataURL(file);
                oReader.onload = function (e) { 
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function() {
                        //如果图片有旋转状态-重新绘制图片上传；否则直接上传图片
                        if (Orientation&&Orientation != "" && Orientation != 1) {
                            var expectWidth = this.naturalWidth;
                            var expectHeight = this.naturalHeight;
                            if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                                expectWidth = 800;
                                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                            } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                                expectHeight = 1200;
                                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                            }
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            canvas.width = expectWidth;
                            canvas.height = expectHeight;
                            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                            var base64 = null;
                            if (Orientation != "" && Orientation != 1) {
                                switch (Orientation) {
                                    case 6: //需要顺时针（向左）90度旋转  
                                        _this.rotateImg(this, 'right', canvas);
                                        break;
                                    case 8: //需要逆时针（向右）90度旋转  
                                        _this.rotateImg(this, 'left', canvas);
                                        break;
                                    case 3: //需要180度旋转  
                                        _this.rotateImg(this, 'right', canvas,2); 
                                        break;
                                }
                            }
                            base64 = canvas.toDataURL("image/jpeg", 0.8);

                            blob=_this.dataURLtoBlob(base64);
                        }else{
                            blob=_this.dataURLtoBlob(e.target.result);
                        }
                        //上传图片接口
                        // let fd=new FormData();
                        // fd.append("uploadFile",blob,file.name);
                        // event.target.value="";
                    };
                }
            }
        },
        /* 旋转图片 */
        rotateImg(img, direction, canvas,s=1) {
            //最小与最大旋转方向，图片旋转4次后回到原方向   
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);    
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
            var height = img.height;
            var width = img.width;
            var step = 0;
            if (direction == 'right') {
                step += s;
                //旋转到原位置，即超过最大值    
                step > max_step && (step = min_step);
            } else {
                step -= s;
                step < min_step && (step = max_step);
            }
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
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
}
</style>
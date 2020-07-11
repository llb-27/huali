let baseUrl = "http://localhost/lib/shop";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];
            // console.log(id);
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';

                    let picture = JSON.parse(res.picture);
                    console.log(picture);
                    temp = `<div class="XiaoTu">                 
                                <img src="${baseUrl}/src/${picture[0].src}" alt="">                           
                            </div>
                            <div class="details-r">
                                <p class="title">韩式系列/亲爱的你--粉佳人玫瑰16枝、白和粉色洋桔梗各5枝、尤加利10枝、浅紫色小菊3枝、深粉色绣球1枝</p>
                                <p class="teacher">花艺师打造 韩式花束系列</p>
                                <p class="sell"><span class="sell-num"></span>${res.num}</p>
                                <p class="hengxian"></p>
                                <ul class="introduce">
                                    <li>
                                        <p>类 别：</p><span>鲜花-韩式鲜花系列 编 号：9012455</span>
                                    </li>
                                    <li>
                                        <p>材 料：</p><span>韩式花束系列：粉佳人玫瑰16枝、3头或以上白色洋桔梗5枝、3头或以上粉色洋桔梗5枝、尤加利10枝、浅紫色小菊3枝、深粉色绣球1枝</span>
                                    </li>
                                    <li>
                                        <p>包 装：</p><span>蓝色人造纸8张、白色雪梨纸2张、粉色罗纹烫金丝带1.5米</span>
                                    </li>
                                    <li>
                                        <p>花 语：</p><span>我喜欢的样子你都有</span>
                                    </li>
                                    <li>
                                        <p>附 送：</p><span>下单填写留言，即免费赠送精美贺卡！</span>
                                    </li>
                                    <li>
                                        <p>配 送：</p><span>全国(小城市请提前一天预定)</span>
                                    </li>
                                    <li>
                                        <p>配 送至：</p>
                                        <form action="" class="sanjiliandong">
                                            <select id="prov">
                                                <option value="">请选择省份</option>
                                            </select>
                                            <select id="city">
                                                <option value="">请选择城市</option>
                                            </select>
                                            <select id="country">
                                                <option value="">请选择县区</option>
                                            </select>
                                        </form>
                                    </li>
                                </ul>
                                <p class="hengxian"></p>
                                <p class="price">花礼价：<span class="price-logo"><i class="price-num">￥</i></span>${res.price}</p>
                           
                                <input type="number" class="num" min="1" max="" value="1" width="20px" height="20px" border="1px";>
                          
                               <a href="cart.html"> <button class="gocart">加入购物车</button></a>
                            </div>
                            <div class="details-bottomimg">
                                <img src="${baseUrl}/src/${picture[0].src}" alt="" class="details-active" >
                                <img src="${baseUrl}/src/${picture[1].src}" alt=""  class="">
                                <img src="${baseUrl}/src/${picture[2].src}" alt=""   class="">
                                <img src="${baseUrl}/src/${picture[3].src}" alt=""  class="">
                            </div>`
                    $('.details').html(temp);
                    // console.log($('.details-bottomimg'))

                    $('.details').on('mouseover', '.details-bottomimg img', function() {
                        $(this).siblings().removeClass('details-active');
                        $(this).addClass('details-active');
                        $(this).parent().siblings('.XiaoTu').children('img').attr('src', $(this).attr('src'));
                    })

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            let shop = cookie.get('shop');
            // console.log(cookie);
            let product = {
                id: id,
                price: price,
                num: num
            }
            console.log(product);

            if (shop) {
                shop = JSON.parse(shop);

                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = [];
                shop.push(product);
            }

            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});
let baseUrl = "http://localhost/lib/shop";
define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
                let shop = cookie.get('shop'); //   获取cookie数据
                // console.log(shop);
                if (shop.length) {
                    shop = JSON.parse(shop);
                    let idlist = shop.map(elm => elm.id).join();
                    $.ajax({
                        type: "get",
                        url: `${baseUrl}/interface/shop.php`,
                        data: {
                            idlist: idlist
                        },
                        dataType: "json",
                        success: function(res) {
                            // console.log(res);
                            let tempstr = '';
                            res.forEach(elm => {
                                console.log(elm);
                                let picture = JSON.parse(elm.picture);

                                // cookie中获取 于当前从数据库中遍历出的相同元素
                                let arr = shop.filter(val => val.id == elm.id);

                                console.log(arr);

                                tempstr += `<ul class="OneData">
                            <li><span class="check"></span></li>
                            <li class="imgBox">
                                <a href=""><img src="${baseUrl}/src/${picture[0].src}" alt=""></a>
                            </li>
                            <li class="title">
                                <a href="">[鲜花]爱在心头一玫瑰50枝：戴安娜粉玫瑰19枝，红玫瑰31枝</a>
                            </li>
                            <li class="">
                            <p>￥${elm.price}</p>  
                            </li>
                      
                            <li class="One-price">
                                <p>￥${arr[0].num*elm.price}</p>
                            </li>
                            <li class="One-num">
                              
                                <input type="text" value="${arr[0].num}"style="width: 40px ;">
                                
                            </li>
                            <li class="delete" id="${elm.id}">
                                <a href="javascript:void(0);">删除</a>
                            </li>
                        </ul>                            
                            `;
                            });
                            $('.shopcart-body').html(tempstr);
                            $('.shopcart-body').on('click', '.delete', function() {
                                let that = this;
                                let shop1 = [];
                                let flag = confirm('是否删除');
                                shop.forEach(function(elm) {
                                    if (elm.id != that.id) {
                                        shop1.push(elm);
                                    }
                                })
                                shop1 = JSON.stringify(shop1);
                                cookie.set('shop', shop1, 1);
                                location.reload();
                            })

                        }
                    });
                }
            }
            //删除
            // $('.delete').on('click', '.del', function() {
            //     $.ajax({
            //         type: "get",
            //         url: `${baseUrl}/interface/remove.php`,
            //         data: {
            //             id: $(this).attr('data-id')
            //         },
            //         dataType: "json",
            //         success: function(response) {
            //             console.log(location.reload);
            //             location.reload();
            //         }
            //     });
            // });
    }
});
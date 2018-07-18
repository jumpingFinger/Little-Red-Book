import React from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import '../../static/css/shopDetail.less'
import {Carousel,Icon,Button } from 'antd';
import Qs from 'qs'
import {queryInfo,addShopCart,removeShopCart} from '../../api/shopping'
import action from '../../store/action/index';
import Header from "../../component/Header";

class shoppingDetails extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            data:null,
            isShop:-1
        }
    }

    async componentDidMount(){

        let {location:{search}} =this.props;
        console.log(search);
        let {shoppingID=0}=Qs.parse(search.substr(1)) || {};
        this.shoppingid=shoppingID;
        console.log(this.shoppingid);
        let result=await queryInfo(shoppingID);
        console.log(result);
        if (parseFloat(result.state)===0){
            let {pay,unpay}=this.props.shopCart,
                isShop=-1;
            unpay.find(item=>parseFloat(item.id)===parseFloat(shoppingID))?isShop=0:null;
            pay.find(item=>parseFloat(item.id)===parseFloat(shoppingID))?isShop=1:null;

            this.setState({
                data:result.data,
                isShop
            })
        }
    }

    render(){
        let {data,isShop}=this.state;
        if (!data) return '';
        console.log(data);
        let {pic,dec,price,title,id,detailImg}=data;
        return <section className={'DetailsBox'}>
            <Header>
                    <Icon type="left" className={'icon'} onClick={()=>{
                        this.props.history.goBack();
                    }}/>
            </Header>
            {/*!*轮播图数据开始*!*/}
            {/*轮播图数据开始*/}
            {pic && pic.length !== 0 ? (<Carousel autoplay className={"banner"}>
                {pic.map((item, index) => {

                    return <div key={index}>
                        <img src={item}/>
                    </div>;
                })}
            </Carousel>) : ''}
            {/*轮播图数据结束*!*/}

            {/*详情*/}
            <div className={'price'}>
                <span className={'limit'}>限时特价</span>
                <h2>${price}</h2>
            </div>
            <div className={'detail'}>
                <h3>{dec}</h3>
                <p>{detailImg}</p>
                <h4>{title}</h4>
                <div className={'images'}>
                    {pic.map((item, index) => {

                        return <div key={index}>
                            <img src={item}/>
                        </div>;
                    })}

                </div>
            </div>
            {/*详情*/}

            {/*加入购物车开始*/}
            <div className={'shopcar'}>
                <div className={'one'}>
                    <Icon type="bank" style={{ fontSize: '.45rem', color: '#333' }} />
                    <span>店铺</span>
                </div>
                <div className={'one'}>
                    <Link to='../shopCar'>
                        <Icon type="shopping-cart" style={{ fontSize: '.45rem', color: '#333' }} />
                        <span>购物车</span>
                    </Link>
                </div>
                <div className={'two'}>
                    {isShop!==1?(<Button onClick={this.handleShopCart} id='button1'>{isShop===-1?"加入购物车" : "从购物车移除"}</Button>):''}

                </div>
                <div className={'two'}>
                    <Button style={{background:'red'}}>立即购买</Button>
                </div>
            </div>
            {/*加入购物车结束*/}
        </section>
    }

    handleShopCart = async ev => {

        if (this.state.isShop === -1) {
            //=>还未加入购物车（按钮：加入购物车）
            let result = await addShopCart(this.shoppingid);
            console.log(result);
            if (parseFloat(result.code) === 0) {
                //=>DISPATCH派发任务：通知REDUX容器中的购物信息进行更新
                this.props.queryUnpay();

                //=>页面重新展示最新样式
                this.setState({isShop: 0});
            }
            return;
        }
        //=>已经加入购物车（按钮：移除购物车）
        let result = await removeShopCart(this.shoppingid);
        console.log(result);
        if (parseFloat(result.code) === 0) {
            this.props.queryUnpay();//=>更新购物车存储的数据
            this.setState({isShop: -1});
        }
    }


}

export default connect(state=>state.shop,action.shop)(shoppingDetails);


import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect,Link} from "react-router-dom";
import Footer from '../../component/Footer';
import '../../static/css/common.less'
import { Carousel,Icon,Button } from 'antd';
import action from '../../store/action/index';
import  Header from "../../component/Header";

class ShoppingHome extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            page:this.page,
            isLoading: false,
            isShow: this.props.moreIsShow,
        };
    }




    async componentDidMount() {
        let {queryBanner, bannerData,courseData,queryList} = this.props;
        if (!bannerData || bannerData.length === 0) {
            queryBanner();//=>DISPATCH
        }
        if (courseData.data.length === 0) {
            queryList();//=>DISPATCH
        }

    }


    componentWillReceiveProps() {
        //=>在当前案例中，触发这个生命周期函数，说明传递给组件的属性改变了（路由重新渲染或者是REDUX容器中的状态改变了）
        this.setState({isLoading: false});
    }

    loadMore = () => {
        if (this.isRun) return;
        this.isRun=false;
        let {queryList, courseData} = this.props;

        //=>防止重复点击
        if (this.state.isLoading) return;
        this.setState({isLoading: true});

        //=>重新发送新的DISPATCH：PAGE是在当前PAGE的基础上累加1，TYPE一定要沿用当前筛选的TYPE，FLAG点击加载更多，是向REDUX容器中追加新获取的信息
        queryList({
            page: courseData.page + 1,
            flag: 'push'
        });

    };

    render(){
        let {bannerData,courseData} = this.props,
        {data} = courseData;
        return <div className={"shoppingBox1"}>
            <Header>
                <Icon type="menu-fold" className={'icon'} onClick={() => {
                    this.props.changeMoreShow(true);
                }}/>
                <h3 className={'title'}><span>商城</span></h3>
            </Header>
            {/*轮播图数据开始*/}
            {bannerData && bannerData.length !== 0 ? (<Carousel autoplay className={"banner"}>
                {bannerData.map((item, index) => {
                    let {img} = item;
                    return <div key={index}>
                        <img src={img}/>
                    </div>;
                })}
            </Carousel>) : ''}
            {/*轮播图数据结束*/}


            {/*新人专属优惠开始*/}
            <div className={'newPerson'}>
                <h3>-&nbsp; 新人专属优惠 &nbsp;-</h3>
                <div className={'img'}>
                    <img src='//ci.xiaohongshu.com/c8e012a0-1763-4a53-bf15-81adce1eec15@r_750w_750h_ss1.jpg'/>
                    <span>在寒冷的北京如何过一个温馨的圣诞节</span>
                </div>
                <div className={'allimg'}>
                    <div className={'img1'}>
                        <img src='//ci.xiaohongshu.com/1446bd72-3260-4a75-8630-da2d2118be60@r_750w_750h_ss1.jpg'/>
                        <span>iPhone X使用指南</span>
                    </div>
                    <div className={'img1 img2'}>
                        <img src='//ci.xiaohongshu.com/2a31a7dd-b11d-41ba-9f14-9b1a716608d6@r_750w_750h_ss1.jpg'/>
                        <span>上海过圣诞去哪里耍</span>
                    </div>
                </div>
            </div>
            {/*新人专属优惠结束*/}

            {/*推荐开始*/}
            <div className={'Recommend clearfix'}>
                <ul className={'allRecommend'}>
                    <li>
                        <div className={'left'}>
                            <h6>福利社</h6>
                            <p>冰感防晒喷雾￥29.9</p>
                        </div>
                        <div className={'right'}>
                            <img src="//ci.xiaohongshu.com/d10d1abf-078d-4c8d-9375-52feac9a1029@r_640w_640h.jpg"/>
                        </div>
                    </li>
                    <li>
                        <div className={'left'}>
                            <h6>仙女社</h6>
                            <p>冰感防晒喷雾￥29.9</p>
                        </div>
                        <div className={'right'}>
                            <img src="//ci.xiaohongshu.com/652eec73-37e2-4d6e-b916-69a3038d1b2d@r_640w_640h.jpg"/>
                        </div>
                    </li>
                    <li>
                        <div className={'left'}>
                            <h6>领券中心</h6>
                            <p>冰感防晒喷雾￥29.9</p>
                        </div>
                        <div className={'right'}>
                            <img src="//ci.xiaohongshu.com/fdc51ab3-3f2f-4b83-8b0a-e8734970a417@r_640w_640h.jpgg"/>
                        </div>
                    </li>
                    <li>
                        <div className={'left'}>
                            <h6>黑卡会员</h6>
                            <p>冰感防晒喷雾￥29.9</p>
                        </div>
                        <div className={'right'}>
                            <img src="//ci.xiaohongshu.com/fe622e68-f890-4232-9b87-536f7794d3b9@r_640w_640h.jpg"/>
                        </div>
                    </li>
                </ul>
            </div>
            {/*推荐结束*/}

            {/*推荐图片开始*/}
            <div className={'smallBanner'}>
                <img src='//img.alicdn.com/imgextra/i3/85/TB2LYIYBTtYBeNjy1XdXXXXyVXa_!!85-0-luban.jpg'/>
            </div>
            {/*推荐图片结束*/}

            {/*编辑推荐开始*/}
            <div className={'edit'}>
                <h3>编辑推荐</h3>
                <ul className={'editBanner'}>
                    <li>
                        <img src='//ci.xiaohongshu.com/b609ce13-07b2-483e-91c7-a3b127c9bc15?imageView2/1/w/330/h/188/q/90'/>
                    </li>
                    <li>
                        <img src='//ci.xiaohongshu.com/f91b8e59-4f3e-400a-9b02-f8c2db4ff52a?imageView2/1/w/330/h/188/q/90'/>
                    </li>
                    <li>
                        <img src='//ci.xiaohongshu.com/54dcf3a2-fc8d-42a9-b091-0bf5537cc8b5?imageView2/1/w/330/h/188/q/90'/>
                    </li>
                </ul>
            </div>
            {/*编辑推荐结束*/}

            {/*瀑布流排序开始*/}
            <div className='courseList'>
                {data && data.length !== 0 ? (<div>
                    <ul className="flowBox clearfix">
                        {data.map((item, index) => {
                            let {id, title, dec, price, pic} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/shopping/detail',
                                    search: `?shoppingID=${id}`
                                }}>
                                    <div className='pic'>
                                        <img src={pic}/>
                                    </div>
                                    <h3>{title}</h3>
                                    <p>{dec}</p>
                                    <span>${price}</span>
                                </Link>
                            </li>;
                        })}
                    </ul>
                    {data.total <= courseData.page ? '' : (
                        <Button type='dashed' onClick={this.loadMore} loading={this.state.isLoading}>加载更多数据</Button>)}
                </div>) : '暂无数据'}
            </div>
            {/*瀑布流排序结束*/}

            <div className={'buyCar'}>
                <Icon type="shopping-cart"  style={{ fontSize: '.6rem', color: '#fff' }}  />
            </div>
            {/*购物车*/}
            <Footer/>
        </div>;
    }
}
export default connect(state => ({...state.shop,...state.more}),{...action.shop,...action.more})(ShoppingHome);
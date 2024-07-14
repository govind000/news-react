import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    article = []
    constructor() {
        super();
        this.state = {
            articles : [],
            loading: false,
            page: 1,
            totalResult : 0
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&from=2024-05-12s&pagesize=8&apikey=a8b62495c790457ebed5bf0fc959f5d1`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            loading: true
        });
        this.setState({
            articles: parsedData.articles,
            totalResult : parsedData.totalResults,
            loading: false
        });
    }

    handlePrevClick = async () => { 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a8bda7e4b0e941ed907b066a19747f7a&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => { 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a8bda7e4b0e941ed907b066a19747f7a&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
  render() {
    console.log("render");
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: "35px 0px" }}>NewsWala - Top Headlines</h1>
        { this.state.loading && <Spinner/>}
         <div className="row">
            {!this.state.loading &&this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
                <NewsItem title={element.title? element.title.slice(0,35): ""} description={element.description ? element.description.slice(0,88): ""} imageUrl={element.urlToImage? element.urlToImage : "https://c.ndtvimg.com/2024-07/8lvtkuho_puja-khedkar_625x300_12_July_24.jpeg?im=FaceCrop,algorithm=dnn,width=1200,height=738?ver-20240615.100"} newsUrl = {element.url} />
            </div>
            })}
         </div>
         <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
         </div>
      </div>
    )
  }
}

export default News

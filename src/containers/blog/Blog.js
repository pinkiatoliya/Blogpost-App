import React, { Component } from 'react';
import Auxiliary from '../../auxiliary/Auxiliary';
import axios from 'axios';
import './Blog.css';
import Pagination from '../../components/pagination/pagination';
import PostModal from '../../components/modal/post-modal';

class Blog extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            pageSize: 20,
            pageNumber: 0,
            isShowPosts: false,
            totalPage: 0,
            pageOfItems: [],
            toggleModal: false,
            selectedPost: {}
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 10000);
      }
      
      componentWillUnmount() {
        this.timer = null; // here...
      }
      
      getItems() {
        let url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + this.state.pageNumber;
        axios.get(url).then(response => {
            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    posts: [...this.state.posts, ...response.data.hits],
                    pageNumber: this.state.pageNumber + 1,
                    isShowPosts: true,
                    totalPage: response.data.nbPages,
                    pageSize: response.data.hitsPerPage,
                })
            }
        })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
      }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleClose = () => this.setState({toggleModal: false});
    handleShow = (post) =>{
        this.setState({
            selectedPost: post
        })
        this.setState({toggleModal: true})};
    render() {
        let tRow= null, tableData= null;
        let posts = this.state.pageOfItems;
        tRow = posts.map(post=>{
            return  <tr key={post.objectID} onClick={()=>{this.handleShow(post)}}>
            <td><b>{post.title}</b></td>
            <td><a href={post.url} rel="noopener noreferrer"  target="_blank">{post.url} </a></td>
            <td>{new Date(post.created_at).toLocaleDateString('en-GB')}</td>
            <td>{post.author}</td>
        </tr>
        });

        tableData = (<table className="rtable">
                        <thead>
                            <tr key="tHead">
                                <th>Title</th>
                                <th>URL</th>
                                <th>Created At</th>
                                <th>Author</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        {tRow}
                        </tbody>
                    </table>);
        return (
            <Auxiliary>
                <h2>Post List</h2><br />
                {this.state.isShowPosts? tableData : <h3>Loading data......</h3>}
                {this.state.isShowPosts? <Pagination items={this.state.posts} onChangePage={this.onChangePage} />: null}
                
                {this.state.toggleModal ? <PostModal isModalShow ={this.state.toggleModal} clicked = {this.handleClose} post={this.state.selectedPost}/> : null}
            </Auxiliary>
        );
    }
}

export default Blog;
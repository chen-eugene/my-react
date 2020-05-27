import React, {Component} from 'react';
import axios from '../../axios'
import './App.less';

class App extends Component {

    state = {
        searchStr: 'kittens',
        photoList: []
    }

    handleClick() {
        this.queryPics()
    }

    queryPics() {
        const data = {
            method: 'flickr.photos.search',
            api_key: '3e7cc266ae2b0e0d78e279ce8e361736',
            format: 'json',
            nojsoncallback: '1',
            safe_search: '1',
            text: this.state.searchStr
        }
        axios.ajax({
            url: '/services/rest/',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            console.dir(res)
            this.setState({
                photoList: res.photos.photo
            })
        })
    }

    handleValueChange(e) {
        this.setState({
            searchStr: e.target.value
        })
    }

    render() {
        return <div className="App">
            <div className="search-box">
                <form id="search-form">
                    <input type="text" className="search-input-text" id="search-input" placeholder="请输入"
                           value={this.state.searchStr} onChange={this.handleValueChange.bind(this)}/>
                    <input type="button" className="search-input-button" value="搜索"
                           onClick={this.handleClick.bind(this)}/>
                </form>
            </div>
            <div className="content">
                {
                    this.state.photoList.map((item) => (
                        <div>
                            <img src={`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`} alt=""/>
                        </div>
                    ))

                }
            </div>
        </div>
    }

}

export default App;

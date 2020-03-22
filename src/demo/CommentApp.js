import React from 'react'
import {CommentInput} from './CommentInput'
import {CommentList} from './CommentList'

import 'index.css'

export class CommentApp extends React.Component {

    render() {
        return <div className='wrapper'>
            <CommentInput/>
            <CommentList/>
        </div>
    }

}

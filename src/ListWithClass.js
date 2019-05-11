import React from 'react';

import { CHUNK_SIZE, NEXT_CHUNK_THRESHOLD_PX } from './constants';


export class ListWithClass extends React.Component {
    state = {
        items: [],
        numberOfChunks: 1,
        renderedListID: null,
    };
    
    containerRef = React.createRef();

    componentDidMount() {
        this.fetchItems();
        this.containerRef.current.addEventListener('scroll', this.tryIncrementNumberOfChunks);
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevProp.listID !== this.props.listID) {
            this.fetchItems();
        } else {
            this.tryIncrementNumberOfChunks();
        }
    }

    componentWillUnmount() {
        this.containerRef.current.removeEventListener('scroll', this.tryIncrementNumberOfChunks);
    }

    tryIncrementNumberOfChunks = () => {
        const containerElement = this.containerRef.current;
        const itemsChunkSize = this.state.numberOfChunks * CHUNK_SIZE;
        if ((itemsChunkSize < this.state.items.length) && (containerElement.offsetHeight + containerElement.scrollTop >= containerElement.scrollHeight - NEXT_CHUNK_THRESHOLD_PX)) {
            this.setState(state => ({ numberOfChunks: state.numberOfChunks + 1 }));
        }
    }

    fetchItems = () => {
        const currentListID = this.props.listID;
        if(this.state.renderedListID !== currentListID) {
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${currentListID}`)
                .then(response => response.json())
                .then(items => {
                    if (currentListID === this.props.listID) {
                        this.setState({
                            numberOfChunks: 1,
                            items,
                            renderedListID: this.props.listID,
                        });
                    }
                });
        }
    }

    render() {
        const itemsChunkSize = this.state.numberOfChunks * CHUNK_SIZE;
        const itemsChunk = this.state.items.slice(0, itemsChunkSize);
        const isLoading = this.state.renderedListID !== this.props.listID;
        return(
            <div className="content-container">
                <div ref={this.containerRef} className="items-container">
                    {itemsChunk.map(item => (
                        <div key={item.id} className="item">
                            <h1>{item.id}</h1>
                            <h2>{item.title}</h2>
                        </div>
                    ))}
                </div>
                {isLoading && <div className="spinner"><h2>Loading...</h2></div>}
            </div>
        );
    }
}
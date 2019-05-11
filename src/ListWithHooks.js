import React, { useState, useEffect, useRef } from 'react';

import { CHUNK_SIZE, NEXT_CHUNK_THRESHOLD_PX } from './constants';


export const ListWithHooks = (props) => {
    const [items, setItems] = useState([]);
    const [numberOfChunks, setNumberOfChunks] = useState(1);

    const containerRef = useRef();
    const renderedListID = useRef();

    useEffect(() => {
        let isCanceled = false;
        if(renderedListID.current !== props.listID) {
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${props.listID}`)
                .then(response => response.json())
                .then(data => {
                    if(!isCanceled) {
                        setNumberOfChunks(1);
                        setItems(data);
                        renderedListID.current = props.listID;
                    }
                });
        }
        return () => isCanceled = true;
    }, [props.listID]);

    useEffect(() => {
        const containerElement = containerRef.current;
        const tryIncrementNumberOfChunks = () => {
            const itemsChunkSize = numberOfChunks * CHUNK_SIZE;
            if ((itemsChunkSize < items.length) && (containerElement.clientHeight + containerElement.scrollTop >= containerElement.scrollHeight - NEXT_CHUNK_THRESHOLD_PX)) {
                setNumberOfChunks(numberOfChunks => numberOfChunks + 1);
            }
        };
        tryIncrementNumberOfChunks();
        containerElement.addEventListener('scroll', tryIncrementNumberOfChunks);
        return () => containerElement.removeEventListener('scroll', tryIncrementNumberOfChunks);
    }, [items.length, numberOfChunks]);

    const itemsChunkSize = numberOfChunks * CHUNK_SIZE;
    const itemsChunk = items.slice(0, itemsChunkSize);
    const isLoading = renderedListID.current !== props.listID;
    return (
        <div className="content-container">
            <div ref={containerRef} className="items-container">
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
};

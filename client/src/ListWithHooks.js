import React, { useState, useEffect, useRef } from 'react';

import { CHUNK_SIZE, NEXT_CHUNK_THRESHOLD_PX } from './constants';


export const ListWithHooks = (props) => {
    const [items, setItems] = useState([]);
    const [numberOfChunks, setNumberOfChunks] = useState(1);
    const [renderedListID, setRenderedListID] = useState();

    const containerRef = useRef();

    useEffect(() => {
        let isCanceled = false;
        if(renderedListID !== props.listID) {
            fetch(`/api/users/${props.listID}`)
                .then(response => response.json())
                .then(data => {
                    if(!isCanceled) {
                        setNumberOfChunks(1);
                        setItems(data);
                        setRenderedListID(props.listID);
                    }
                });
        }
        return () => isCanceled = true;
    }, [props.listID, renderedListID]);

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
        window.addEventListener('resize', tryIncrementNumberOfChunks);
        return () => {
            containerElement.removeEventListener('scroll', tryIncrementNumberOfChunks);
            window.removeEventListener('resize', tryIncrementNumberOfChunks);
        };
    }, [items.length, numberOfChunks]);

    const itemsChunkSize = numberOfChunks * CHUNK_SIZE;
    const itemsChunk = items.slice(0, itemsChunkSize);
    const isLoading = renderedListID !== props.listID;
    return (
        <div className="content-container">
            <div ref={containerRef} className="items-container">
                {itemsChunk.map(item => (
                    <div key={item.id} className="item">
                        <div className="item-content">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <a href={item.url}>{item.url}</a>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <div className="spinner"><h2>Loading...</h2></div>}
        </div>
    );
};

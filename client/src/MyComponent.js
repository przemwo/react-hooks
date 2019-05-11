import React, { useState, useEffect, useRef } from 'react';

// TODO:
// window.resize => try incrementNumberOfChunks

const CHUNK_SIZE = 3;

export default (props) => {
    const [dataID, setDataID] = useState(null);
    const [items, setItems] = useState([]);
    const [numberOfChunks, setNumberOfChunks] = useState(1);
    const containerRef = useRef();

    useEffect(() => {
        let shouldUpdate = true;
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${props.user}`)
        .then(res => res.json())
        .then(data => {
            console.log(props.user, dataID);
            if (shouldUpdate && props.user !== dataID) {
                setItems(data);
                setNumberOfChunks(1);
                setDataID(props.user);
            }
        });
        return () => shouldUpdate = false;
    }, [props.user, dataID]);

    useEffect(() => {
        const containerElement = containerRef.current;
        const incrementNumberOfChunks = () => {
            if ((numberOfChunks * CHUNK_SIZE < items.length) && (containerElement.offsetHeight + containerElement.scrollTop >= containerElement.scrollHeight - 100)) {
                setNumberOfChunks((numberOfChunks) => numberOfChunks + 1);
            }
        };
        containerElement.addEventListener('scroll', incrementNumberOfChunks);
        incrementNumberOfChunks();
        return () => containerElement.removeEventListener('scroll', incrementNumberOfChunks);
    });

    const itemsChunk = items.slice(0, CHUNK_SIZE * numberOfChunks);
    return(
        <div ref={containerRef} className="content-container">
            {itemsChunk.map(repo => (
                <div key={repo.id} className="item">
                    <h1>{repo.id}</h1>
                    <h2>{repo.title}</h2>
                </div>
            ))}
        </div>
    );
};

// export default class MyComponent extends React.Component {
//     state = {
//         userRepos: [],
//         numberOfChunks: 1,
//     };
//     containerRef = React.createRef();

//     componentDidMount() {
//         this.fetchData();

//         // nasluchuj scroll
//         this.containerRef.current.addEventListener('scroll', this.incrementNumberOfChunks);
//     }

//     componentDidUpdate(prevProp, prevState) {
//         if(prevProp.user !== this.props.user) {
//             this.fetchData();
//         } else {
//             // czy pokazac wiecej elementow?
//             this.incrementNumberOfChunks();
//         }
//     }

//     componentWillUnmount() {
//         this.containerRef.current.removeEventListener('scroll', this.incrementNumberOfChunks);
//     }

//     handleScroll = () => {
//         const containerElement = this.containerRef.current;
//         if (containerElement.offsetHeight + containerElement.scrollTop > containerElement.scrollHeight - 100) {
//             console.log('next!', this.state.numberOfChunks);
//             this.setState((state) => ({
//                 numberOfChunks: state.numberOfChunks + 1,
//             }));
//         }
//     };

//     incrementNumberOfChunks = () => {
//         const containerElement = this.containerRef.current;
//         if ((this.state.numberOfChunks * CHUNK_SIZE < this.state.userRepos.length) && (containerElement.offsetHeight + containerElement.scrollTop >= containerElement.scrollHeight - 100)) {
//             this.setState((state) => ({
//                 numberOfChunks: state.numberOfChunks + 1,
//             }));
//         }
//     }

//     fetchData = () => {
//         const currentUser = this.props.user;
//         fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.props.user}`)
//             .then(res => res.json())
//             .then(data => {
//                 if (currentUser === this.props.user) {
//                     this.setState({
//                         userRepos: data,
//                         numberOfChunks: 1,
//                     });
//                 }
//             });
//     }

//     render() {
//         const listChunk = this.state.userRepos.slice(0, CHUNK_SIZE * this.state.numberOfChunks);
//         return(
//             <div ref={this.containerRef} className="content-container">
//                 {listChunk.map(repo => (
//                     <div key={repo.id} className="item">
//                         <h1>{repo.id}</h1>
//                         <h2>{repo.title}</h2>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }
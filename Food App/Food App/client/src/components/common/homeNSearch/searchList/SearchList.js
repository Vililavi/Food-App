import React, { useState } from 'react';
import './searchList.css';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import SearchResults from '../searchResults/SearchResults';
import Modal from 'react-modal';


export default function SearchList(props) {

  const [selattavaResepti, setselattavaResepti] = useState('');

  const [modaaliauki, setmodaaliauki] = useState(false);
  const avaamodaali = (e) => {
    setselattavaResepti(e);
    setmodaaliauki(true);
  }
  const suljemodaali = () => { setmodaaliauki(false) }

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const [reseptit, setReseptit] = React.useState([]);

  React.useEffect(() => {
    setReseptit(props.results)
  }, [props.results]);

  return (
    <div>

      <div className="kukka" style={{ width: '78%', height: '100vh' }} >
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={reseptit.length}
              rowRenderer={({ key, index, style, parent }) => {
                const resepti = reseptit[index];


                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >

                    <div class="wrapper" style={style}>
                      <div id="one">
                        <i className="fas fa-carrot"> </i>
                      </div>
                      <div id="two">

                        <h2>{resepti.name}</h2>
                        <br></br>
                        <p>Reseptin tyyppi: {resepti.type}</p>
                        <p></p>
                        <button onClick={(e) => avaamodaali(e.target.value)} className="painike2" value={resepti._id}>Näytä</button>
                      </div>
                      <Modal isOpen={modaaliauki}>
                        <button onClick={suljemodaali} className="painike3">x</button>
                        <p>{setselattavaResepti}</p>
                        <SearchResults selattavaResepti={selattavaResepti} />

                      </Modal>
                    </div>

                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>

    </div>
  );

}
import React, { useState } from 'react';
import Modal from './Modal'

function CardReader () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardNumber, cardNumberSet] = useState("")
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = ( card ) => {
      cardNumberSet(card)
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <h1>Card reader</h1>
        <button onClick={openModal}>Open Camera</button>
        {isModalOpen && <Modal closeModal={closeModal} />}
        {cardNumber}
      </div>
    );
}

export default CardReader;
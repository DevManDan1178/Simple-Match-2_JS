import './SingleCard.css';
//Image of mystery card
const unflippedCardImage= {"src": "/img/Mystery.png"}


export default function SingleCard({ card, handleChoice, flipped}) {

    const onBackClicked = () => {
        handleChoice(card);
    }

    return (
        <div className={flipped ? 'flipped' : ""}>
            <div className='card'>
                <div>
                    <img className='front' src={card.src} alt='card front'/>
                    <img className='back' src={unflippedCardImage.src} alt='card back' onClick={onBackClicked}/>                
                </div>
            </div>
        </div>
    )
}
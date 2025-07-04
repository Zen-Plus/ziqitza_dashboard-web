import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../../../../../components/Logo';

function Card({ wrapClassName, title, subTitle, data, cardStyle, iconStyle, iconUrl }) {
    return (
        <div className={`Dashboard_DataCard_Wrap ${wrapClassName}`}>
            <div className="Dashboard_DataCard Height-Full" style={cardStyle}>
                <div className="Icon" style={iconStyle}>
                    <Logo src={`/dashboard/${iconUrl}`} style={{ width: '100%' }} />
                </div>
                <div className="DataCard_Content Flex Flex-Direction-Column Mt-20" style={{ justifyContent: 'space-between'}}>
                    <div className="Title Font--S16 Text-Decoration-UpperCase Text--White Font--WB">
                        {title}
                        {subTitle && <div className="Sub_Title Font--S18 Text-Decoration-UpperCase Text--White Font--WB Mt-5 Font--Italic">
                        {subTitle}
                    </div>}
                    </div>
                    <div className="Data Font--S24 Text--White Font--WB">
                        {data !== null ? data : 'NA'}
                    </div>
                </div>
            </div>
        </div>
    )
}
Card.defaultProps = {
    wrapClassName: '',
    subTitle: '',
    data: '',
    title: '',
}

Card.propTypes = {
    wrapClassName: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    data: PropTypes.string,
}

export default Card


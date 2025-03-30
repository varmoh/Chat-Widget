import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyledButtonType, TERMS_AND_CONDITIONS_LINK} from '../../constants';
import EU_SF_logo_src from '../../static/icons/sf_logo_horizontal.jpg';
import NEXT_GEN_FLAGS from '../../static/icons/NextGen_Rahastanud_EL_NextGeneration.jpg';
import {TermsAndConditionsStyles, WidgetDetailsStyles} from "../../styling/StyledElements";

const WidgetDetails = (): JSX.Element => {
    const {t} = useTranslation();

    return (
        <WidgetDetailsStyles initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
            <div className="content">
                <div className="btn-group">
                    <TermsAndConditionsStyles
                        className="termsAndConditions"
                        onClick={() => window.open(TERMS_AND_CONDITIONS_LINK, '_blank')}
                        styleType={StyledButtonType.GRAY}
                    >
                        <span className="terms-btn-text">{t('widget.terms-and-conditions')}</span>
                        <span className="external_link_icon"/>
                    </TermsAndConditionsStyles>
                </div>
                <div className="detail-text">
                    <h4>{t('widget.details-header')}</h4>
                    <p>{t('widget.details-body')}</p>
                </div>
                <div className="flags center">
                    <img className="eu-sf-logo" src={EU_SF_logo_src} alt={t('alt.label.EU_SF')} height="90"
                         width="160"/>
                    <img className="next-gen-flags" src={NEXT_GEN_FLAGS} alt={t('alt.label.NEXT_GEN')} height="90"
                         width="198"/>
                </div>
            </div>
        </WidgetDetailsStyles>
    );
};


export default WidgetDetails;

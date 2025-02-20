import React, {FC, ReactNode, useState} from 'react';
import {Language} from 'types/developer-tools';

import {Container, Divider, PageTitle} from 'components';
import Breadcrumb from '../Breadcrumb';
import SideMenu from '../SideMenu';

import './DeveloperPortalLayout.scss';

type Props = {
  children: (selectedLanguages: Language[]) => ReactNode;
  pageName: string;
};

const DeveloperPortalLayout: FC<Props> = ({children, pageName}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  const toggleLanguage = React.useCallback(
    (language: Language) => {
      if (selectedLanguages.includes(language)) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
      } else {
        setSelectedLanguages([...selectedLanguages, language]);
      }
    },
    [selectedLanguages],
  );

  return (
    <>
      <PageTitle title={pageName} />
      <div className="DeveloperPortalLayout__breadcrumb">
        <Container>
          <Breadcrumb selectedLanguages={selectedLanguages} toggleLanguage={toggleLanguage} />
        </Container>
        <Divider />
      </div>
      <Container>
        <div className="DeveloperPortalLayout__main-content">
          <div className="DeveloperPortalLayout__left-content">
            <SideMenu selectedLanguages={selectedLanguages} toggleLanguage={toggleLanguage} />
          </div>
          <div className="DeveloperPortalLayout__right-content">{children(selectedLanguages)}</div>
        </div>
      </Container>
    </>
  );
};

export default DeveloperPortalLayout;

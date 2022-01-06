'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">schooltrack documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddStudentsModule.html" data-type="entity-link" >AddStudentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddStudentsModule-dcbf515a444ca00f461727e589ba100d32da789d7957ed4ce83419603cad403a6e24eebcd93fe1a8b534ee541ff81d3d3c8f435e6c9c00ccd977ffd41f0b290f"' : 'data-target="#xs-components-links-module-AddStudentsModule-dcbf515a444ca00f461727e589ba100d32da789d7957ed4ce83419603cad403a6e24eebcd93fe1a8b534ee541ff81d3d3c8f435e6c9c00ccd977ffd41f0b290f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddStudentsModule-dcbf515a444ca00f461727e589ba100d32da789d7957ed4ce83419603cad403a6e24eebcd93fe1a8b534ee541ff81d3d3c8f435e6c9c00ccd977ffd41f0b290f"' :
                                            'id="xs-components-links-module-AddStudentsModule-dcbf515a444ca00f461727e589ba100d32da789d7957ed4ce83419603cad403a6e24eebcd93fe1a8b534ee541ff81d3d3c8f435e6c9c00ccd977ffd41f0b290f"' }>
                                            <li class="link">
                                                <a href="components/AddStudentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BasicDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MedicalDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicalDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AddStudentsRoutingModule.html" data-type="entity-link" >AddStudentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AlumniModule.html" data-type="entity-link" >AlumniModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlumniModule-9e0ecd02119eb8383777a46a838e0462283d5c72e3cf6420fab6eb50b571962962b8cfcff1ee98f2c9d8d1a26a47d9669bbeb3710ec844a1d5567190a232af50"' : 'data-target="#xs-components-links-module-AlumniModule-9e0ecd02119eb8383777a46a838e0462283d5c72e3cf6420fab6eb50b571962962b8cfcff1ee98f2c9d8d1a26a47d9669bbeb3710ec844a1d5567190a232af50"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumniModule-9e0ecd02119eb8383777a46a838e0462283d5c72e3cf6420fab6eb50b571962962b8cfcff1ee98f2c9d8d1a26a47d9669bbeb3710ec844a1d5567190a232af50"' :
                                            'id="xs-components-links-module-AlumniModule-9e0ecd02119eb8383777a46a838e0462283d5c72e3cf6420fab6eb50b571962962b8cfcff1ee98f2c9d8d1a26a47d9669bbeb3710ec844a1d5567190a232af50"' }>
                                            <li class="link">
                                                <a href="components/AlumniAlumniComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniAlumniComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniEventDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniEventDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniEventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniRecordsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniRecordsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlumniTranscriptComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumniTranscriptComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlumniRoutingModule.html" data-type="entity-link" >AlumniRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-61f66e0e5caf6d3f065316ef887185e3e0f57d88af13dfbace0b1e9a752264b9370f3fce693b36ad2e35c407f78886acee029c25ff0789d714c0bdeee9872af6"' : 'data-target="#xs-components-links-module-AppModule-61f66e0e5caf6d3f065316ef887185e3e0f57d88af13dfbace0b1e9a752264b9370f3fce693b36ad2e35c407f78886acee029c25ff0789d714c0bdeee9872af6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-61f66e0e5caf6d3f065316ef887185e3e0f57d88af13dfbace0b1e9a752264b9370f3fce693b36ad2e35c407f78886acee029c25ff0789d714c0bdeee9872af6"' :
                                            'id="xs-components-links-module-AppModule-61f66e0e5caf6d3f065316ef887185e3e0f57d88af13dfbace0b1e9a752264b9370f3fce693b36ad2e35c407f78886acee029c25ff0789d714c0bdeee9872af6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthenticationModule-570a3d048657097ef5db77315289c384cc8c3f4a041b3b66405f779f2e3b99720054efe4b7ee2f5f551bf3b27317e9f4dca426e17ae352ad56caaa27ad1743c3"' : 'data-target="#xs-components-links-module-AuthenticationModule-570a3d048657097ef5db77315289c384cc8c3f4a041b3b66405f779f2e3b99720054efe4b7ee2f5f551bf3b27317e9f4dca426e17ae352ad56caaa27ad1743c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationModule-570a3d048657097ef5db77315289c384cc8c3f4a041b3b66405f779f2e3b99720054efe4b7ee2f5f551bf3b27317e9f4dca426e17ae352ad56caaa27ad1743c3"' :
                                            'id="xs-components-links-module-AuthenticationModule-570a3d048657097ef5db77315289c384cc8c3f4a041b3b66405f779f2e3b99720054efe4b7ee2f5f551bf3b27317e9f4dca426e17ae352ad56caaa27ad1743c3"' }>
                                            <li class="link">
                                                <a href="components/AdminLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmailVerifiedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailVerifiedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParentLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeacherLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherLoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationRoutingModule.html" data-type="entity-link" >AuthenticationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CreateBranchModule.html" data-type="entity-link" >CreateBranchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CreateBranchModule-3a415eabc1e8fb26dfad44ac4c1f0e02dd297dc3f81113cecf4e4151da2662ea011a417390a89adf882201140d730d3b6cf84f49bedc360450805245ef327f9e"' : 'data-target="#xs-components-links-module-CreateBranchModule-3a415eabc1e8fb26dfad44ac4c1f0e02dd297dc3f81113cecf4e4151da2662ea011a417390a89adf882201140d730d3b6cf84f49bedc360450805245ef327f9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateBranchModule-3a415eabc1e8fb26dfad44ac4c1f0e02dd297dc3f81113cecf4e4151da2662ea011a417390a89adf882201140d730d3b6cf84f49bedc360450805245ef327f9e"' :
                                            'id="xs-components-links-module-CreateBranchModule-3a415eabc1e8fb26dfad44ac4c1f0e02dd297dc3f81113cecf4e4151da2662ea011a417390a89adf882201140d730d3b6cf84f49bedc360450805245ef327f9e"' }>
                                            <li class="link">
                                                <a href="components/BranchContactPersonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchContactPersonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BranchInformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BranchLocationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchLocationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateBranchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateBranchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreateBranchRoutingModule.html" data-type="entity-link" >CreateBranchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CreateClientModule.html" data-type="entity-link" >CreateClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CreateClientModule-c30e796da4ccef911383a0cf05f968c930b486e7e0f4b52a7d231a6a859c0768b8884f7b73c71139f3e7d6882614da96ad36253249fa126a098dfdb865038185"' : 'data-target="#xs-components-links-module-CreateClientModule-c30e796da4ccef911383a0cf05f968c930b486e7e0f4b52a7d231a6a859c0768b8884f7b73c71139f3e7d6882614da96ad36253249fa126a098dfdb865038185"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateClientModule-c30e796da4ccef911383a0cf05f968c930b486e7e0f4b52a7d231a6a859c0768b8884f7b73c71139f3e7d6882614da96ad36253249fa126a098dfdb865038185"' :
                                            'id="xs-components-links-module-CreateClientModule-c30e796da4ccef911383a0cf05f968c930b486e7e0f4b52a7d231a6a859c0768b8884f7b73c71139f3e7d6882614da96ad36253249fa126a098dfdb865038185"' }>
                                            <li class="link">
                                                <a href="components/ContactDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactPersonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactPersonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MediaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileInformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileInformationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreateClientRoutingModule.html" data-type="entity-link" >CreateClientRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EmployeeModule-fe8f054932328da7dce955ea1d2ac6dc57dc1decf6544558e2c823237d8c9fe9b78f1404e184e4dec67b180a62b645d2c26eca6a77837c9b2702ba5ae7323d21"' : 'data-target="#xs-components-links-module-EmployeeModule-fe8f054932328da7dce955ea1d2ac6dc57dc1decf6544558e2c823237d8c9fe9b78f1404e184e4dec67b180a62b645d2c26eca6a77837c9b2702ba5ae7323d21"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-fe8f054932328da7dce955ea1d2ac6dc57dc1decf6544558e2c823237d8c9fe9b78f1404e184e4dec67b180a62b645d2c26eca6a77837c9b2702ba5ae7323d21"' :
                                            'id="xs-components-links-module-EmployeeModule-fe8f054932328da7dce955ea1d2ac6dc57dc1decf6544558e2c823237d8c9fe9b78f1404e184e4dec67b180a62b645d2c26eca6a77837c9b2702ba5ae7323d21"' }>
                                            <li class="link">
                                                <a href="components/EducationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NextOfKinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NextOfKinComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalInformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkExperienceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkExperienceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeRoutingModule.html" data-type="entity-link" >EmployeeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceModule.html" data-type="entity-link" >FinanceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceRoutingModule.html" data-type="entity-link" >FinanceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceSettingModule.html" data-type="entity-link" >FinanceSettingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FinanceSettingModule-09bb2e30a3e5691fbf18f5625a3caf9b268a76348496eceeb5af289e548e5d23c67967c62c8096c66d93b0161dc817e935debdae1bc36d14f017c1bc2ede14f6"' : 'data-target="#xs-components-links-module-FinanceSettingModule-09bb2e30a3e5691fbf18f5625a3caf9b268a76348496eceeb5af289e548e5d23c67967c62c8096c66d93b0161dc817e935debdae1bc36d14f017c1bc2ede14f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceSettingModule-09bb2e30a3e5691fbf18f5625a3caf9b268a76348496eceeb5af289e548e5d23c67967c62c8096c66d93b0161dc817e935debdae1bc36d14f017c1bc2ede14f6"' :
                                            'id="xs-components-links-module-FinanceSettingModule-09bb2e30a3e5691fbf18f5625a3caf9b268a76348496eceeb5af289e548e5d23c67967c62c8096c66d93b0161dc817e935debdae1bc36d14f017c1bc2ede14f6"' }>
                                            <li class="link">
                                                <a href="components/AccountMappingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountMappingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BankAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartOfAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartOfAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiscountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeeComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeeComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeeTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeeTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAccountChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewAccountChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewFeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewFeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewVendorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewVendorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PayrollAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PayrollAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceSettingRoutingModule.html" data-type="entity-link" >FinanceSettingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalAdminModule.html" data-type="entity-link" >GlobalAdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GlobalAdminModule-dad0a64d5187e62f665177de2b503ff6c69638cc94f4e4a0d0393e899edd655824b8616f75cc2d7155e29d5ea8922609e7ee5c6f9803a06d9003b05177f2407d"' : 'data-target="#xs-components-links-module-GlobalAdminModule-dad0a64d5187e62f665177de2b503ff6c69638cc94f4e4a0d0393e899edd655824b8616f75cc2d7155e29d5ea8922609e7ee5c6f9803a06d9003b05177f2407d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GlobalAdminModule-dad0a64d5187e62f665177de2b503ff6c69638cc94f4e4a0d0393e899edd655824b8616f75cc2d7155e29d5ea8922609e7ee5c6f9803a06d9003b05177f2407d"' :
                                            'id="xs-components-links-module-GlobalAdminModule-dad0a64d5187e62f665177de2b503ff6c69638cc94f4e4a0d0393e899edd655824b8616f75cc2d7155e29d5ea8922609e7ee5c6f9803a06d9003b05177f2407d"' }>
                                            <li class="link">
                                                <a href="components/ClientDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GlobalAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GlobalAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LaterThingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LaterThingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewroleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewroleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalAdminRoutingModule.html" data-type="entity-link" >GlobalAdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroupedSchoolsModule.html" data-type="entity-link" >GroupedSchoolsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupedSchoolsModule-c0dd4dc45499aace8042de6199417e0d5886f5dcefd0d3425e436f4672893cd8eab942fa55a9c0817873d51548ba85dee68674037860c626d386f7d0fb8b3644"' : 'data-target="#xs-components-links-module-GroupedSchoolsModule-c0dd4dc45499aace8042de6199417e0d5886f5dcefd0d3425e436f4672893cd8eab942fa55a9c0817873d51548ba85dee68674037860c626d386f7d0fb8b3644"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupedSchoolsModule-c0dd4dc45499aace8042de6199417e0d5886f5dcefd0d3425e436f4672893cd8eab942fa55a9c0817873d51548ba85dee68674037860c626d386f7d0fb8b3644"' :
                                            'id="xs-components-links-module-GroupedSchoolsModule-c0dd4dc45499aace8042de6199417e0d5886f5dcefd0d3425e436f4672893cd8eab942fa55a9c0817873d51548ba85dee68674037860c626d386f7d0fb8b3644"' }>
                                            <li class="link">
                                                <a href="components/GroupedSchoolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupedSchoolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolContactPersonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolContactPersonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolInformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolMediaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolMediaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupedSchoolsRoutingModule.html" data-type="entity-link" >GroupedSchoolsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LandingpageModule.html" data-type="entity-link" >LandingpageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LandingpageModule-8345f4435f8cd7de982f6ac3a9d7d38b3e449522f1392ecb0a831a2dc631c9f70193eed6891e98eeb9ec4200133dc1dc4a9b67d0af785a8aa5a06b31ae7f9a07"' : 'data-target="#xs-components-links-module-LandingpageModule-8345f4435f8cd7de982f6ac3a9d7d38b3e449522f1392ecb0a831a2dc631c9f70193eed6891e98eeb9ec4200133dc1dc4a9b67d0af785a8aa5a06b31ae7f9a07"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LandingpageModule-8345f4435f8cd7de982f6ac3a9d7d38b3e449522f1392ecb0a831a2dc631c9f70193eed6891e98eeb9ec4200133dc1dc4a9b67d0af785a8aa5a06b31ae7f9a07"' :
                                            'id="xs-components-links-module-LandingpageModule-8345f4435f8cd7de982f6ac3a9d7d38b3e449522f1392ecb0a831a2dc631c9f70193eed6891e98eeb9ec4200133dc1dc4a9b67d0af785a8aa5a06b31ae7f9a07"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DemoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaqsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaqsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LandingpageRoutingModule.html" data-type="entity-link" >LandingpageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ParentModule.html" data-type="entity-link" >ParentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ParentModule-205bf4c1e54acfd953625f236d55b75a2565042666861673cf2ee15970dfc3a0c3c0fb0b91db0a6da3c55b481b4da5ca63abc14aab35e298ca340a9bbb73bcea"' : 'data-target="#xs-components-links-module-ParentModule-205bf4c1e54acfd953625f236d55b75a2565042666861673cf2ee15970dfc3a0c3c0fb0b91db0a6da3c55b481b4da5ca63abc14aab35e298ca340a9bbb73bcea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ParentModule-205bf4c1e54acfd953625f236d55b75a2565042666861673cf2ee15970dfc3a0c3c0fb0b91db0a6da3c55b481b4da5ca63abc14aab35e298ca340a9bbb73bcea"' :
                                            'id="xs-components-links-module-ParentModule-205bf4c1e54acfd953625f236d55b75a2565042666861673cf2ee15970dfc3a0c3c0fb0b91db0a6da3c55b481b4da5ca63abc14aab35e298ca340a9bbb73bcea"' }>
                                            <li class="link">
                                                <a href="components/ParentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParentPortalModule.html" data-type="entity-link" >ParentPortalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ParentPortalModule-f8608d682d152606ac71a8ee01280d1462a59c08f3b66cad02872c488777fa7f8a0557aeac7626ecf9db12aa2577f02c0f8d395245a6a7fd5910eb26cac7745f"' : 'data-target="#xs-components-links-module-ParentPortalModule-f8608d682d152606ac71a8ee01280d1462a59c08f3b66cad02872c488777fa7f8a0557aeac7626ecf9db12aa2577f02c0f8d395245a6a7fd5910eb26cac7745f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ParentPortalModule-f8608d682d152606ac71a8ee01280d1462a59c08f3b66cad02872c488777fa7f8a0557aeac7626ecf9db12aa2577f02c0f8d395245a6a7fd5910eb26cac7745f"' :
                                            'id="xs-components-links-module-ParentPortalModule-f8608d682d152606ac71a8ee01280d1462a59c08f3b66cad02872c488777fa7f8a0557aeac7626ecf9db12aa2577f02c0f8d395245a6a7fd5910eb26cac7745f"' }>
                                            <li class="link">
                                                <a href="components/BillingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentPortalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParentPortalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBillingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBillingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewReportCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewReportCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewReportSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewReportSheetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParentPortalRoutingModule.html" data-type="entity-link" >ParentPortalRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ParentRoutingModule.html" data-type="entity-link" >ParentRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PromotionModule.html" data-type="entity-link" >PromotionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PromotionModule-5f87ed3cfe1dc339bc477cf9427a9ea006464db98dca875a59a538a5d00cb6f47cef9dcee4b2e354bcb3b647efafc08c9e393823528ca7fe6223ae8de16f87f1"' : 'data-target="#xs-components-links-module-PromotionModule-5f87ed3cfe1dc339bc477cf9427a9ea006464db98dca875a59a538a5d00cb6f47cef9dcee4b2e354bcb3b647efafc08c9e393823528ca7fe6223ae8de16f87f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PromotionModule-5f87ed3cfe1dc339bc477cf9427a9ea006464db98dca875a59a538a5d00cb6f47cef9dcee4b2e354bcb3b647efafc08c9e393823528ca7fe6223ae8de16f87f1"' :
                                            'id="xs-components-links-module-PromotionModule-5f87ed3cfe1dc339bc477cf9427a9ea006464db98dca875a59a538a5d00cb6f47cef9dcee4b2e354bcb3b647efafc08c9e393823528ca7fe6223ae8de16f87f1"' }>
                                            <li class="link">
                                                <a href="components/ClassPoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassPoolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassRepeatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassRepeatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PromotionDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PromotionDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WithdrawalListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WithdrawalListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PromotionRoutingModule.html" data-type="entity-link" >PromotionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolBranchManagerModule.html" data-type="entity-link" >SchoolBranchManagerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolBranchManagerModule-7afbe64d5a7bad69a516cdaf6b6e090463072d0f529d677be0555174d51ddfb2b926e2e964e392b405b32b450aca9db12f9a44076fc682757f0ccc74c9774e15"' : 'data-target="#xs-components-links-module-SchoolBranchManagerModule-7afbe64d5a7bad69a516cdaf6b6e090463072d0f529d677be0555174d51ddfb2b926e2e964e392b405b32b450aca9db12f9a44076fc682757f0ccc74c9774e15"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolBranchManagerModule-7afbe64d5a7bad69a516cdaf6b6e090463072d0f529d677be0555174d51ddfb2b926e2e964e392b405b32b450aca9db12f9a44076fc682757f0ccc74c9774e15"' :
                                            'id="xs-components-links-module-SchoolBranchManagerModule-7afbe64d5a7bad69a516cdaf6b6e090463072d0f529d677be0555174d51ddfb2b926e2e964e392b405b32b450aca9db12f9a44076fc682757f0ccc74c9774e15"' }>
                                            <li class="link">
                                                <a href="components/BranchDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolBranchManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolBranchManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolManagerBranchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolManagerBranchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolManagerDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolManagerDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolManagerRoutingModule.html" data-type="entity-link" >SchoolManagerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolModule-2a98bd227ea3cf8ec13b3974f609ba2339ac05f1e46ca4ff6e9602d94940476268117fe7e6a37fa65e739b30bf572fd5926c5b07cb93d068b9bacd9d7dece38f"' : 'data-target="#xs-components-links-module-SchoolModule-2a98bd227ea3cf8ec13b3974f609ba2339ac05f1e46ca4ff6e9602d94940476268117fe7e6a37fa65e739b30bf572fd5926c5b07cb93d068b9bacd9d7dece38f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolModule-2a98bd227ea3cf8ec13b3974f609ba2339ac05f1e46ca4ff6e9602d94940476268117fe7e6a37fa65e739b30bf572fd5926c5b07cb93d068b9bacd9d7dece38f"' :
                                            'id="xs-components-links-module-SchoolModule-2a98bd227ea3cf8ec13b3974f609ba2339ac05f1e46ca4ff6e9602d94940476268117fe7e6a37fa65e739b30bf572fd5926c5b07cb93d068b9bacd9d7dece38f"' }>
                                            <li class="link">
                                                <a href="components/AdminAlumniCreateEventComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminAlumniCreateEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminAlumniEventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminAlumniEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminAlumniListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminAlumniListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttachTeacherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttachTeacherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComingSoonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComingSoonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeriodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PeriodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolGradeBookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolGradeBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentResultSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentResultSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeachersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimeTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolRoutingModule.html" data-type="entity-link" >SchoolRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolSubscriptionModule.html" data-type="entity-link" >SchoolSubscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolSubscriptionModule-c674e0f2b5f22b2ad33cdc900c42e6c20d5979ae78b979b59e7aa62398013991181d61dae3f51ee389e9c4fd8e74956919cb87a304221eba5d71cc52e3d9fc58"' : 'data-target="#xs-components-links-module-SchoolSubscriptionModule-c674e0f2b5f22b2ad33cdc900c42e6c20d5979ae78b979b59e7aa62398013991181d61dae3f51ee389e9c4fd8e74956919cb87a304221eba5d71cc52e3d9fc58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolSubscriptionModule-c674e0f2b5f22b2ad33cdc900c42e6c20d5979ae78b979b59e7aa62398013991181d61dae3f51ee389e9c4fd8e74956919cb87a304221eba5d71cc52e3d9fc58"' :
                                            'id="xs-components-links-module-SchoolSubscriptionModule-c674e0f2b5f22b2ad33cdc900c42e6c20d5979ae78b979b59e7aa62398013991181d61dae3f51ee389e9c4fd8e74956919cb87a304221eba5d71cc52e3d9fc58"' }>
                                            <li class="link">
                                                <a href="components/SubscriptionInvoiceArreasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionInvoiceArreasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscriptionInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscriptionListsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionListsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscriptionPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnpaidSubscriptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UnpaidSubscriptionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolSubscriptionRoutingModule.html" data-type="entity-link" >SchoolSubscriptionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-ec491fdec253615b2f746fe466c56a8a46985bab124bdda21af3475736376232b23be82bd5f869480c967c6555b6fe793e610fc7c6d42ca025293168b3625dcf"' : 'data-target="#xs-components-links-module-SettingsModule-ec491fdec253615b2f746fe466c56a8a46985bab124bdda21af3475736376232b23be82bd5f869480c967c6555b6fe793e610fc7c6d42ca025293168b3625dcf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-ec491fdec253615b2f746fe466c56a8a46985bab124bdda21af3475736376232b23be82bd5f869480c967c6555b6fe793e610fc7c6d42ca025293168b3625dcf"' :
                                            'id="xs-components-links-module-SettingsModule-ec491fdec253615b2f746fe466c56a8a46985bab124bdda21af3475736376232b23be82bd5f869480c967c6555b6fe793e610fc7c6d42ca025293168b3625dcf"' }>
                                            <li class="link">
                                                <a href="components/AccountSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FacilitySettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacilitySettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinanceSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinanceSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewRoleRecordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRoleRecordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PayrollSetttingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PayrollSetttingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PromotionSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PromotionSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolManagerSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolManagerSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link" >SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' : 'data-target="#xs-components-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' :
                                            'id="xs-components-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomenavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomenavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoRecordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoRecordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' : 'data-target="#xs-pipes-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' :
                                            'id="xs-pipes-links-module-SharedModule-fefabe594a41cca70256ac741794efb4646c6115f1f6e7681ad56d00b1a689b146fd6262ae7290c13e8725b380fcd9840cc30c9190fe22cf93efdcd2598043f0"' }>
                                            <li class="link">
                                                <a href="pipes/TableSearchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableSearchPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TrustedHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrustedHtmlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TrustedUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrustedUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentModule.html" data-type="entity-link" >StudentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentModule-981e79af1a1b44d9394021e8dc928ac85eb10174ec68f878fbf02ca27546e81546c5956a75bb20c9581b515bf8b52b5aeac5eed50edb748a2343865375a73145"' : 'data-target="#xs-components-links-module-StudentModule-981e79af1a1b44d9394021e8dc928ac85eb10174ec68f878fbf02ca27546e81546c5956a75bb20c9581b515bf8b52b5aeac5eed50edb748a2343865375a73145"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentModule-981e79af1a1b44d9394021e8dc928ac85eb10174ec68f878fbf02ca27546e81546c5956a75bb20c9581b515bf8b52b5aeac5eed50edb748a2343865375a73145"' :
                                            'id="xs-components-links-module-StudentModule-981e79af1a1b44d9394021e8dc928ac85eb10174ec68f878fbf02ca27546e81546c5956a75bb20c9581b515bf8b52b5aeac5eed50edb748a2343865375a73145"' }>
                                            <li class="link">
                                                <a href="components/AssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassScheduleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileStorageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileStorageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VirtualClassroomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VirtualClassroomComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentRoutingModule.html" data-type="entity-link" >StudentRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeacherModule.html" data-type="entity-link" >TeacherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeacherModule-b0e964b03f6cde050fef857eec06dcbdc448e1a3d6a3d434d8895e3e84e3e1c830dcc9d8551dbe102de1aee32b52118ddab3ce8a11c2dd76fcde92263ad5cc33"' : 'data-target="#xs-components-links-module-TeacherModule-b0e964b03f6cde050fef857eec06dcbdc448e1a3d6a3d434d8895e3e84e3e1c830dcc9d8551dbe102de1aee32b52118ddab3ce8a11c2dd76fcde92263ad5cc33"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeacherModule-b0e964b03f6cde050fef857eec06dcbdc448e1a3d6a3d434d8895e3e84e3e1c830dcc9d8551dbe102de1aee32b52118ddab3ce8a11c2dd76fcde92263ad5cc33"' :
                                            'id="xs-components-links-module-TeacherModule-b0e964b03f6cde050fef857eec06dcbdc448e1a3d6a3d434d8895e3e84e3e1c830dcc9d8551dbe102de1aee32b52118ddab3ce8a11c2dd76fcde92263ad5cc33"' }>
                                            <li class="link">
                                                <a href="components/AssignmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BroadSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BroadSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradebookComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradebookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MailReportCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailReportCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MarkAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MarkAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScoreSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScoreSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScoreSheetDetailsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScoreSheetDetailsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentScoreSheetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentScoreSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubjecAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubjecAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeacherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewFileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewFileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VirtualClassComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VirtualClassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VirtualSessionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VirtualSessionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeacherRoutingModule.html" data-type="entity-link" >TeacherRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AssignmentComponent-1.html" data-type="entity-link" >AssignmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BasicDetailsComponent-1.html" data-type="entity-link" >BasicDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BillingComponent-1.html" data-type="entity-link" >BillingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactDetailsComponent-1.html" data-type="entity-link" >ContactDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-1.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-2.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-3.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-4.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeDetailsComponent-1.html" data-type="entity-link" >EmployeeDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FileManagerComponent-1.html" data-type="entity-link" >FileManagerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImagesComponent-1.html" data-type="entity-link" >ImagesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MediaComponent-1.html" data-type="entity-link" >MediaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReportCardComponent-1.html" data-type="entity-link" >ReportCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SocialDetailsComponent-1.html" data-type="entity-link" >SocialDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimeTableComponent-1.html" data-type="entity-link" >TimeTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimeTableComponent-2.html" data-type="entity-link" >TimeTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent-1.html" data-type="entity-link" >UsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewReportCardComponent-1.html" data-type="entity-link" >ViewReportCardComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/NoSpaceValidator.html" data-type="entity-link" >NoSpaceValidator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlumniService.html" data-type="entity-link" >AlumniService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssessmentService.html" data-type="entity-link" >AssessmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssignmentService.html" data-type="entity-link" >AssignmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceService.html" data-type="entity-link" >AttendanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassArmService.html" data-type="entity-link" >ClassArmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassService.html" data-type="entity-link" >ClassService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassWorkService.html" data-type="entity-link" >ClassWorkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentService.html" data-type="entity-link" >DepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinanceService.html" data-type="entity-link" >FinanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GradeService.html" data-type="entity-link" >GradeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonNoteService.html" data-type="entity-link" >LessonNoteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParentsService.html" data-type="entity-link" >ParentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PromotionService.html" data-type="entity-link" >PromotionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PropertyService.html" data-type="entity-link" >PropertyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultService.html" data-type="entity-link" >ResultService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolSectionService.html" data-type="entity-link" >SchoolSectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolService.html" data-type="entity-link" >SchoolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StaffService.html" data-type="entity-link" >StaffService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentService.html" data-type="entity-link" >StudentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubjectService.html" data-type="entity-link" >SubjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionsService.html" data-type="entity-link" >SubscriptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherService.html" data-type="entity-link" >TeacherService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeTableService.html" data-type="entity-link" >TimeTableService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpErrorInterceptor.html" data-type="entity-link" >HttpErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardGuard.html" data-type="entity-link" >AuthGuardGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BranchGuard.html" data-type="entity-link" >BranchGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/GlobalAdminGuard.html" data-type="entity-link" >GlobalAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SchoolGuard.html" data-type="entity-link" >SchoolGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentGuard.html" data-type="entity-link" >StudentGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeacherGuard.html" data-type="entity-link" >TeacherGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
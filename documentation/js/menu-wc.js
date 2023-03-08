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
                    <a href="index.html" data-type="index-link">ride-hailing documentation</a>
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
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
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-9b8df20a05c48b66a3d98a562d21a0a85cba012f01885e1c7272b1d1d4dacbaa6090c7ae49ca2d9f3b18efc2433afa118dc4e0f5a38d62d16c4557c4ab75bf38"' : 'data-target="#xs-controllers-links-module-HealthModule-9b8df20a05c48b66a3d98a562d21a0a85cba012f01885e1c7272b1d1d4dacbaa6090c7ae49ca2d9f3b18efc2433afa118dc4e0f5a38d62d16c4557c4ab75bf38"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-9b8df20a05c48b66a3d98a562d21a0a85cba012f01885e1c7272b1d1d4dacbaa6090c7ae49ca2d9f3b18efc2433afa118dc4e0f5a38d62d16c4557c4ab75bf38"' :
                                            'id="xs-controllers-links-module-HealthModule-9b8df20a05c48b66a3d98a562d21a0a85cba012f01885e1c7272b1d1d4dacbaa6090c7ae49ca2d9f3b18efc2433afa118dc4e0f5a38d62d16c4557c4ab75bf38"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestModule.html" data-type="entity-link" >RequestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' : 'data-target="#xs-controllers-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' :
                                            'id="xs-controllers-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' }>
                                            <li class="link">
                                                <a href="controllers/RequestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' : 'data-target="#xs-injectables-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' :
                                        'id="xs-injectables-links-module-RequestModule-5a6cec85efdc246a5d026404ce4031d333d7ce1d416763755bdc1790d6d8de381ead872ebf43ce80c36ccdba85c1f6e6ff2c4db04a43cc6337f1a6ef1c20ab55"' }>
                                        <li class="link">
                                            <a href="injectables/DriverService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriverService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RiderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RiderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TripService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RequestController.html" data-type="entity-link" >RequestController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Car.html" data-type="entity-link" >Car</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Driver.html" data-type="entity-link" >Driver</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Location.html" data-type="entity-link" >Location</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Payment.html" data-type="entity-link" >Payment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Request.html" data-type="entity-link" >Request</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Rider.html" data-type="entity-link" >Rider</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Trip.html" data-type="entity-link" >Trip</a>
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
                                <a href="classes/AddRelationBetweenDriversAndCars1678187764454.html" data-type="entity-link" >AddRelationBetweenDriversAndCars1678187764454</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRelationBetweenRidersAndPaymentMethods1678185298028.html" data-type="entity-link" >AddRelationBetweenRidersAndPaymentMethods1678185298028</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterPaymentsTableToAddFieldsFromGatewayResponse1678295934312.html" data-type="entity-link" >AlterPaymentsTableToAddFieldsFromGatewayResponse1678295934312</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterPaymentsTableToAddTransactionId1678308519422.html" data-type="entity-link" >AlterPaymentsTableToAddTransactionId1678308519422</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterRequestEntityToRenameFieldsWithAMoreSuitableName1678223649061.html" data-type="entity-link" >AlterRequestEntityToRenameFieldsWithAMoreSuitableName1678223649061</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterRequestTableToHandleGeometryFields1678285496704.html" data-type="entity-link" >AlterRequestTableToHandleGeometryFields1678285496704</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterRequestTableToImplementSpatialColumnTypesForLocation1678276720338.html" data-type="entity-link" >AlterRequestTableToImplementSpatialColumnTypesForLocation1678276720338</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterRequestTableToRemoveSurge1678280557690.html" data-type="entity-link" >AlterRequestTableToRemoveSurge1678280557690</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTripsTableToFixRelationIssues1678223295357.html" data-type="entity-link" >AlterTripsTableToFixRelationIssues1678223295357</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTripsTableToHandleGeolocationFields1678290428231.html" data-type="entity-link" >AlterTripsTableToHandleGeolocationFields1678290428231</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTripsTableToHandlePayments1678221796470.html" data-type="entity-link" >AlterTripsTableToHandlePayments1678221796470</a>
                            </li>
                            <li class="link">
                                <a href="classes/Base.html" data-type="entity-link" >Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCarsTable1678187456870.html" data-type="entity-link" >CreateCarsTable1678187456870</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDriversTable1678187115666.html" data-type="entity-link" >CreateDriversTable1678187115666</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLocationsTable1678182431069.html" data-type="entity-link" >CreateLocationsTable1678182431069</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentMethodsTable1678185095471.html" data-type="entity-link" >CreatePaymentMethodsTable1678185095471</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRequestsTable1678216032691.html" data-type="entity-link" >CreateRequestsTable1678216032691</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRidersTable1678182352019.html" data-type="entity-link" >CreateRidersTable1678182352019</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTripsTable1678218041445.html" data-type="entity-link" >CreateTripsTable1678218041445</a>
                            </li>
                            <li class="link">
                                <a href="classes/DropPaymentMethodTableAndRelations1678294718551.html" data-type="entity-link" >DropPaymentMethodTableAndRelations1678294718551</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinishRideDto.html" data-type="entity-link" >FinishRideDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocationDto.html" data-type="entity-link" >LocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapBox.html" data-type="entity-link" >MapBox</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentGateway.html" data-type="entity-link" >PaymentGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/RenameNameColumnInRidersTable1678186681233.html" data-type="entity-link" >RenameNameColumnInRidersTable1678186681233</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestRideDto.html" data-type="entity-link" >RequestRideDto</a>
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
                                    <a href="injectables/DriverService.html" data-type="entity-link" >DriverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link" >PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RiderService.html" data-type="entity-link" >RiderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TripService.html" data-type="entity-link" >TripService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseConfig.html" data-type="entity-link" >DatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DistanceToKilometers.html" data-type="entity-link" >DistanceToKilometers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DurationToMinutes.html" data-type="entity-link" >DurationToMinutes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeneratePaymentReference.html" data-type="entity-link" >GeneratePaymentReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenerateTransaction.html" data-type="entity-link" >GenerateTransaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDirection.html" data-type="entity-link" >GetDirection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Http.html" data-type="entity-link" >Http</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethod.html" data-type="entity-link" >PaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RateLimiting.html" data-type="entity-link" >RateLimiting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenizeCard.html" data-type="entity-link" >TokenizeCard</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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
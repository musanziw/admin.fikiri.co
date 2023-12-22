import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Seo from '@/shared/layout-components/seo/seo';
import axios from '@/pages/api/axios';

ChartJS.register(...registerables);

const Linechart = {
    responsive: true,
};
const Rapport = () => {
    const [dataUser, setDataUser] = useState([]);
    const [userRegistrationData, setUserRegistrationData] = useState({
        labels: [],
        datasets: [
            {
                label: "Nombre d'inscription",
                data: [],
                borderColor: '#f74f75',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    });

    const [dataSolution, setDataSolution] = useState([]);
    const [solutionRegistrationData, setSolutionRegistrationData] = useState({
        labels: [],
        datasets: [
            {
                label: "Nombre de solutions",
                data: [],
                borderColor: '#38cab3',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/users');
                setDataUser(response.data.data);

                const registrationData = response.data.data.reduce((acc, user) => {
                    const registrationMonth = new Date(user.createdAt).getMonth();
                    acc[registrationMonth] = (acc[registrationMonth] || 0) + 1;
                    return acc;
                }, Array(12).fill(0));

                setUserRegistrationData((prevData) => ({
                    ...prevData,
                    labels: [
                        'Janv.',
                        'Fév.',
                        'Mar.',
                        'Avr.',
                        'Mai',
                        'Juin',
                        'Juill.',
                        'Août',
                        'Sept.',
                        'Oct.',
                        'Nov.',
                        'Déc.',
                    ],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: registrationData,
                        },
                    ],
                }));
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        const fetchSolutionData = async () => {

            try {
                const response = await axios.get('/solutions');
                setDataSolution(response.data.data);
                const registrationData = response.data.data.reduce((acc, solution) => {
                    const registrationMonth = new Date(solution.createdAt).getMonth();
                    acc[registrationMonth] = (acc[registrationMonth] || 0) + 1;
                    return acc;
                }, Array(12).fill(0));

                setSolutionRegistrationData((prevData) => ({
                    ...prevData,
                    labels: [
                        'Janv.',
                        'Fév.',
                        'Mar.',
                        'Avr.',
                        'Mai',
                        'Juin',
                        'Juill.',
                        'Août',
                        'Sept.',
                        'Oct.',
                        'Nov.',
                        'Déc.',
                    ],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: registrationData,
                        },
                    ],
                }));
            } catch (err) {
                console.error('Error fetching solution data:', err);
            }
        }

        fetchData();
        fetchSolutionData();
    }, []);

    return (
        <div>
            <Seo title={'Rapports'} />
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1">RAPPORTS</span>
                </div>
                <div className="justify-content-center mt-2">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
                            Rapports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item " active aria-current="page">
                            Graphiques
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <Row className="row-sm">
                <Col sm={12} md={6}>
                    <Card className=" overflow-hidden">
                        <Card.Body>
                            <div className="main-content-label mg-b-5">Inscription</div>
                            <p className="mg-b-20">{"Nombre d'inscription par mois"}</p>
                            <div className="chartjs-wrapper-demo">
                                {dataUser.length === 0 ? (
                                    <div className="text-center">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                ) : (
                                    <Line options={Linechart} data={userRegistrationData} height={130} className="barchart" />
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card className=" overflow-hidden">
                        <Card.Body>
                            <div className="main-content-label mg-b-5">Solutions</div>
                            <p className="mg-b-20">{"Nombre des Solutions soumises par mois"}</p>
                            <div className="chartjs-wrapper-demo">
                                {
                                    dataSolution.length === 0 ? (
                                        <div className="text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <Line options={Linechart} data={solutionRegistrationData} height={130} className="barchart" />
                                    )
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

Rapport.propTypes = {};

Rapport.defaultProps = {};

Rapport.layout = 'Contentlayout';

export default Rapport;

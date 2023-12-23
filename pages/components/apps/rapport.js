import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Line,Doughnut,Pie } from 'react-chartjs-2';
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

    const [thematiqueData, setThematiqueData] = useState([]);


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

        const fetchThematiqueData = async () => {
            try {
                const response = await axios.get('/thematics');
                console.log(response.data.data)
                setThematiqueData(response.data.data);
            } catch (err) {
                console.error('Error fetching thematique data:', err);
            }
        }

        fetchData();
        fetchSolutionData();
        fetchThematiqueData();
    }, []);

    const countSolutionsByThematic = () => {
        const solutionsCountByThematic = thematiqueData.reduce((acc, thematic) => {
            acc[thematic.name] = 0;
            return acc;
        }, {});

        dataSolution.forEach((solution) => {
            const thematicName = solution.thematic.name;
            solutionsCountByThematic[thematicName]++;
        });

        return Object.values(solutionsCountByThematic);
    };

    const DoughnutData = {
        labels: thematiqueData.map((thematic) => thematic.name),
        datasets: [
            {
                data: countSolutionsByThematic(),
                backgroundColor: ["#6d26be", "#ffbd5a", "#027333","#4ec2f0", "#1a9c86"],
            },
        ],
    };

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
            <Row className="row-sm">
                <Col sm={12} md={12}>
                    <Card className=" mg-b-md-20 overflow-hidden">
                        <Card.Body>
                            <div className="main-content-label mg-b-5">{"Solutions par thématique"}</div>
                            <p className="mg-b-20">Nombre de solution par thématique</p>
                            <div className="chartjs-wrapper-demo ">
                                {
                                    thematiqueData.length === 0 ? (
                                        <div className="text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <Doughnut
                                            data={DoughnutData}
                                            id="chartDonut"
                                            className="chartjs-render-monitor"
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        display: true,
                                                        position: 'top',
                                                        align : "start"// 'top', 'bottom', 'left', 'right'
                                                    },
                                                },
                                                responsive: true, // Ajoutez ceci pour rendre le graphique réactif
                                            }}
                                        />
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

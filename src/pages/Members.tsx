import { useEffect, useState } from 'react';
import "./Members.css"; // Nosso CSS customizado com as cores da LaFEE

import { Modal, Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { getMembers } from '../api';
import type { ApiMember } from '../types/api';

const DEFAULT_IMAGE = '/logo.png';

// --- Interfaces de Props ---

interface ModalProps {
    member: ApiMember | null;
    show: boolean;
    handleClose: () => void;
}

interface CardProps {
    member: ApiMember;
    HandleClick: () => void;
}

// --- Componente Modal ---

function MemberDetailModal({ member, show, handleClose }: ModalProps) {
    if (!member) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="member-modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">Perfil Completo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Row>
                    <Col
                        md={4}
                        className="d-flex flex-column align-items-center justify-content-center border-end text-center"
                    >
                        <img
                            src={member.image_url ?? DEFAULT_IMAGE}
                            alt={`Foto de ${member.name}`}
                            className="profile-image-modal rounded-circle mb-3 shadow"
                        />
                        <h5 className="fw-bold mt-2">{member.name}</h5>
                        <p className="modal-subtitle-custom small mb-0">{member.subtitle}</p>
                        <p className="text-muted small">{member.location}</p>
                    </Col>

                    <Col md={8} className="ps-4">
                        <h4 className="mb-3 modal-bio-title">Biografia</h4>
                        <p className="text-justify modal-bio-text">
                            {member.bio}
                        </p>
                        <hr className="my-3"/>
                        <h6 className="fw-bold">Currículo Lattes:</h6>
                        <p className="small mb-0"><a href={`mailto:${member.links}`}>{member.links}</a></p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-member-close" onClick={handleClose}>
                    Fechar Perfil
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// --- Componente Card ---

function MemberCard({ member, HandleClick }: CardProps) {
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="member-card">
                <Card.Img variant="top" src={member.image_url ?? DEFAULT_IMAGE} className="Profile"/>
                <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="card-title-custom fw-bold">{member.name}</Card.Title>
                    <Card.Subtitle className="card-subtitle-custom mb-2 text-secondary">
                        {member.subtitle}
                    </Card.Subtitle>
                    <Card.Text className="teaser-text text-justify">
                        {member.teaser}
                    </Card.Text>
                    <Button onClick={HandleClick} className="btn-member-action mt-auto">
                        Leia Mais
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

// --- Componente Principal ---

function Members() {
    const [members, setMembers] = useState<ApiMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<ApiMember | null>(null);

    useEffect(() => {
        getMembers()
            .then(setMembers)
            .catch(() => setError('Não foi possível carregar os membros.'))
            .finally(() => setLoading(false));
    }, []);

    const handleCardClick = (member: ApiMember) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMember(null);
    };

    return (
        <Container className="my-5 members-container">
            <h1 className="page-title text-center mb-5">Nossa Equipe</h1>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <Row className="justify-content-center">
                    {members.map(member => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            HandleClick={() => handleCardClick(member)}
                        />
                    ))}
                </Row>
            )}

            <MemberDetailModal
                member={selectedMember}
                show={showModal}
                handleClose={handleCloseModal}
            />
        </Container>
    );
}

export default Members;

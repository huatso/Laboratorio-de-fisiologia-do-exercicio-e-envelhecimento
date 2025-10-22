import React, { useState } from 'react';
import "./Members.css"; // Nosso CSS customizado com as cores da LaFEE

import { Modal, Container, Row, Col, Button, Card } from 'react-bootstrap';
// Importação do array de dados e da interface Member
import MembersData, { Member } from "../data/Members"; 

// --- Interfaces de Props ---

interface ModalProps {
    member: Member | null;
    show: boolean;
    handleClose: () => void;
}

interface CardProps {
    member: Member;
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
                            src={member.ImageUrl} 
                            alt={`Foto de ${member.Name}`} 
                            className="profile-image-modal rounded-circle mb-3 shadow"
                        />
                        <h5 className="fw-bold mt-2">{member.Name}</h5>
                        {/* Classe customizada */}
                        <p className="modal-subtitle-custom small mb-0">{member.SubTitle}</p>
                        <p className="text-muted small">{member.Location}</p>
                    </Col>
                    
                    <Col md={8} className="ps-4">
                        <h4 className="mb-3 modal-bio-title">Biografia</h4>
                        <p className="text-justify modal-bio-text">
                            {member.Bio}
                        </p>
                        <hr className="my-3"/>
                        <h6 className="fw-bold">Contato</h6>
                        <p className="small mb-0">Email/Link: <a href={`mailto:${member.ContactLinks}`}>{member.ContactLinks}</a></p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {/* Classe customizada para o botão de fechar */}
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
                <Card.Img variant="top" src={member.ImageUrl ?? ''} className="Profile"/>
                <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="card-title-custom fw-bold">{member.Name}</Card.Title>
                    <Card.Subtitle className="card-subtitle-custom mb-2 text-secondary">
                        {member.SubTitle}
                    </Card.Subtitle>
                    <Card.Text className="teaser-text text-justify">
                        {member.Teaser}
                    </Card.Text>
                    {/* Classe customizada para o botão de ação */}
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
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    const handleCardClick = (member: Member) => {
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
            
            <Row className="justify-content-center"> 
                {MembersData.map(member => (
                    <MemberCard 
                        key={member.Id} 
                        member={member} 
                        HandleClick={() => handleCardClick(member)} 
                    />
                ))}
            </Row>
            
            <MemberDetailModal 
                member={selectedMember} 
                show={showModal} 
                handleClose={handleCloseModal}
            />
        </Container>
    );
}

export default Members;
import React, { useState } from 'react';
import "./Members.css";

import { Modal, Container, Row, Col, Button, Card } from 'react-bootstrap';
import MembersData, { Member } from "../data/Members"; 

import 'bootstrap/dist/css/bootstrap.min.css';

interface ModalProps {
    member: Member | null;
    show: boolean;
    handleClose: () => void;
}

function MemberDetailModal({ member, show, handleClose }: ModalProps) {
    if (!member) return null; 

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Perfil Completo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Row>
                    <Col 
                        md={4} 
                        // CORREÇÃO: Adicionado justify-content-center para centralização vertical
                        className="d-flex flex-column align-items-center justify-content-center border-end text-center"
                    >
                        <img 
                            src={member.ImageUrl} 
                            alt={`Foto de ${member.Name}`} 
                            style={{width: '150px', height: '150px', objectFit: 'cover'}} 
                            className="rounded-circle mb-3 shadow"
                        />
                        <h5 className="fw-bold mt-2">{member.Name}</h5>
                        <p className="text-muted small mb-0">{member.SubTitle}</p>
                        <p className="text-muted small">{member.Location}</p>
                    </Col>
                    
                    <Col md={8} className="ps-4">
                        <h4 className="mb-3 text-dark fw-bold">Biografia</h4>
                        <p className="text-justify" style={{ whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                            {member.Bio}
                        </p>
                        <hr className="my-3"/>
                        <h6 className="fw-bold">Contato</h6>
                        <p className="small mb-0">Email/Link: <a href={`mailto:${member.ContactLinks}`}>{member.ContactLinks}</a></p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar Perfil
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
interface CardProps {
    member: Member;
    HandleClick: () => void;
}

function MemberCard({ member, HandleClick }: CardProps) {
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card style={{ width: '100%' }}> 
                <Card.Img variant="top" src={member.ImageUrl ?? ''} className="Profile"/>
                <Card.Body className="d-grid justify-items-center">
                    <Card.Title className="fw-bold text-center">{member.Name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-center">{member.SubTitle}</Card.Subtitle>
                    <Card.Text className="teaser-text">{member.Teaser}</Card.Text>
                    <Button onClick={HandleClick} variant="primary">Leia Mais</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

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
        <Container className="my-5">
            <h1 className="text-center mb-4">Nossa Equipe</h1>
            
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
from sqlalchemy.orm import Session
import models


def get_subject(db: Session, subject_id: int):
    return db.query(models.SubjectClass).filter(models.Subject.id == subject_id).first()
    
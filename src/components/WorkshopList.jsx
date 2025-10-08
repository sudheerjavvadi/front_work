// src/components/WorkshopList.jsx
import React from 'react';
import WorkshopCard from './WorkshopCard';
import workshopsData from '../data/workshops';

const WorkshopList = () => {
  return (
    <div className="workshop-list-container">
      {workshopsData.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </div>
  );
};

export default WorkshopList;
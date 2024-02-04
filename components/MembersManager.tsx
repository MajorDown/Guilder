'use client'
import { ConnectedAdmin } from '@/types';
import {useState, useEffect, useRef, FormEvent} from 'react';

export type MembersManagerProps = {
    admin: ConnectedAdmin;
}

/**
 * @module MembersManager
 * 
 * Permet de gérer les membres de la guilde.
 */
const MembersManager = (props: MembersManagerProps) => {
  return (
    <div id="membersManger">MembersManager</div>
  )
}

export default MembersManager;
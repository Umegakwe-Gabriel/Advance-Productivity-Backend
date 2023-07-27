export interface iAuth{
    userName?: string;
    email?: string;
    password?: string;
    avatar?: string;
}

export interface iStep{
    assignedTask?: string;
    assignedAvatar?: string;
    assignedName?: string;
    assignedPriority?: string;
    task?: {};
}

export interface iDone{
    assignedTask?: string;
    assignedAvatar?: string;
    assignedName?: string;
    assignedPriority?: string;
    task?: {};
}

export interface iProgress{
    task?: string;
    avatar?: string;
    name?: string;
    priority?: string;
    step?: {}[];
}

export interface iTask {
    task?: string;
    avatar?: string;
    name?: string;
    priority?: string;
    step?: {}[];
}

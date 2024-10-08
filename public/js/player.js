import { Entity } from './Entity.js';
import { Player } from './traits/Player.js';
import { PlayerController } from './traits/PlayerController.js';

//---- umm... what the heck is a '��'?:
//import { nothing } from '../../private/syntax error.js';
export function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

export function makePlayer(entity, name) {
    const player = new Player();
    player.name = name;
    entity.addTrait(player);
}

export function* findPlayers(entities) {
    for (const entity of entities) {
        if (entity.traits.has(Player)) {
            yield entity;
        }
    }
}
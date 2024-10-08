import { findPlayers } from "../player.js";
import { Player } from "../traits/Player.js";

function getPlayer(entities) {
    for (const entity of findPlayers(entities)) {
        return entity;
    }
}

export function createPlayerProgressLayer(font, level) {
    const size = font.size;

    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = 32;
    spriteBuffer.height = 42;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawPlayerProgress(context) {
        const entity = getPlayer(level.entities);
        let player;
        try {
            player = entity.traits.get(Player);
            font.print('WORLD '+ level.name.toUpperCase(), context, size * 15.5, size * 12);

            font.print('× ' + player.lives.toString().padStart(3 ,'0'),
                        context, size * 18.5, size * 15.5);

            spriteBufferContext.clearRect(0, 0, 
                spriteBuffer.width, spriteBuffer.height);
            entity.draw(spriteBufferContext);
            context.drawImage(spriteBuffer, size * 15.5, size * 15);
        } catch {
            
        }
        
    }
}
import { Vec2 } from "./math.js";
import { AudioBoard } from "./AudioBoard.js";
import { BoundingBox } from "./BoundingBox.js";
import { EventBuffer } from "./EventBuffer.js";
import { Trait } from "./Trait.js";


export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
};

export class Entity {
    constructor() {
        this.audio = new AudioBoard();
        this.canCollide = true;
        this.sounds = new Set();

        this.events = new EventBuffer();

        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
        this.size = new Vec2(0,0);
        this.offset = new Vec2(0,0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = new Map();
    }

    addTrait(trait) {
        this.traits.set(trait.constructor, trait);
        //this.traits.push(trait);
        //this[trait.NAME] = trait;
    }

    collides(candidate) {
        if (this.stomper) {
            return;
        }
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        })
    }

    obstruct(side, match) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }

    draw() {
        
    }
    
    finalize() {
        this.events.emit(Trait.EVENT_TASK, this);

        this.traits.forEach(trait => {
            trait.finalize(this);
        });

        this.events.clear();
        //this.player.events.clear();
    }
    
    playSounds(audioBoard, audioContext) {
        this.sounds.forEach(name => {
            audioBoard.playAudio(name, audioContext);
        });

        this.sounds.clear();
    }

    update(gameContext, level) {
        this.traits.forEach(trait => {
            trait.update(this, gameContext, level);
            //trait.playSounds(this.audio, gameContext.audioContext);
        });

        this.playSounds(this.audio, gameContext.audioContext);

        this.lifetime += gameContext.deltaTime;
    }
}

//---- as default
export default {Entity};
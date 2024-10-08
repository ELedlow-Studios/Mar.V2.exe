import { Entity } from "../Entity.js";
import { Go } from "../traits/Go.js";
import { Jump } from "../traits/Jump.js";
import { Killable } from "../traits/Killable.js";
import { Physics } from "../traits/Physics.js";
import { Solid } from "../traits/Solid.js";
import { Stomper } from "../traits/Stomper.js";
import { loadSpriteSheet } from "../loaders/sprite.js";
//import { createAnim } from "../anim.js";
//import { Velocity } from "../../private/Velocity.js";

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export async function loadEledlowLegacy() { 
    const sprite = await loadSpriteSheet('eledlow');
    return createELedlowLegacyFactory(sprite);
}
//createAnim(['run-1', 'run-2', 'run-3'], 8);

function createELedlowLegacyFactory(sprite) {
    //console.log("Mario {JS/JSON}:", sprite);

    const runAnim = sprite.animation.get('run');

    function routeFrame(eledlow_1) {
        if (eledlow_1.traits.get(Jump).falling) {
            return 'jump';
        }

        if (eledlow_1.traits.get(Go).distance > 0) {
            if ((eledlow_1.vel.x > 0 && eledlow_1.traits.get(Go).dir < 0) || (eledlow_1.vel.x < 0 && eledlow_1.traits.get(Go).dir > 0)) {
                return 'break';
            }

            return runAnim(eledlow_1.traits.get(Go).distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.traits.get(Go).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    };

    function drawELedlowLegacy(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.traits.get(Go).heading < 0);
    };

    return function createELedlowLegacy() {
        const eledlow = new Entity();
        eledlow.name = "Undefined";
        eledlow.size.set(14, 16);
        eledlow.offset.set(0, 2);
        eledlow.addTrait(new Physics());
        eledlow.addTrait(new Solid());
        eledlow.addTrait(new Go());
        eledlow.addTrait(new Jump());
        eledlow.addTrait(new Stomper());
        eledlow.addTrait(new Killable());

        eledlow.traits.get(Killable).removeAfter = 0;
        //eledlow.go.dragFactor = SLOW_DRAG;
        //eledlow.addTrait(new Velocity());
        eledlow.turbo = setTurboState;
        eledlow.draw = drawELedlowLegacy;
        //eledlow.bounds = new BoundingBox(eledlow.pos, eledlow.size, eledlow.offset);

        eledlow.turbo(false);
        
        return eledlow;
    };
}
//
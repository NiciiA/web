import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {EventIdentifier} from '../../utils/identifier';

/**
 * EventService
 *
 * global event management
 *
 * // TODO ACN: Weiterentwicklung mit Anlehnung: https://ngrx.io/guide/store
 *              wäre dann zugleich eine Erweiterung als StateManager -> application status : initialising/running
 *              + http cache, falls notwendig
 *
 * eventService.pub(DeunaEvents.AUTH.LOGIN, payload: any)
 * eventService.sub(DeunaEvents.AUTH.LOGIN, (data) => {})
 *
 * unsubscribe in service or component when finished
 *    this.subscription = eventService.sub(....)
 *    this.subscription.unsubscribe();
 */
export class EventService {

    private _subject = new Subject<{event: EventIdentifier, payload: any}>();

    /**
     * 'call' an event,
     * 'listener' will process the 'called' event
     *
     * this.eventService.pub(DeunaEvents.AUTH.LOGIN, {data: any})
     *
     * @param event
     * @param payload
     */
    public pub(event: EventIdentifier, payload: any): void {
        this._subject.next({event, payload});
    }

    /**
     * 'listen' when an event is 'called' and add a resolver
     *
     * this.eventService.sub(DeunaEvents.AUTH.LOGIN, (data) => {})
     *
     * @param event
     * @param resolver
     */
    public sub(event: EventIdentifier, resolver: any): Subscription {
        return this._subject
            .pipe(
                filter((e: {event: EventIdentifier, payload: any}) => e.event.toReference() === event.toReference()),
                map((e: {event: EventIdentifier, payload: any}) => e.payload)
            ).subscribe(resolver);
    }
}

export default new EventService();

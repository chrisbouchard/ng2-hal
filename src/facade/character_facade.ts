import {Aspect, Character} from 'app/model/character';

export class CharacterFacade {

  fixedCharacters: Character[] = [
    new Character(
        'Amaryllis Aster Jennings',
        'holder.js/400x300?auto=yes&textmode=exact',
        'purple',
        new Set([
          new Aspect('Graying Starfleet Devil', new Set<string>(['high-concept'])),
          new Aspect('Number One', new Set<string>(['trouble'])),
          new Aspect('Captain', new Set<string>(['rank'])),
          new Aspect('To Boldly Go', new Set<string>()),
          new Aspect('Warp Core on Legs', new Set<string>()),
          new Aspect('Glint in the Eye', new Set<string>())
        ]),
        new Map<string, number>()
          .set('Foo', 1)
          .set('Bar', 2)
          .set('Baz', 3)
        )
  ];

  fooBar: Character =
    new Character(
        'Foo Bar',
        'holder.js/400x300?auto=yes&textmode=exact',
        'blue',
        new Set([
          new Aspect('Lorem Ipsum Dolor Sit Amen', new Set<string>(['high-concept'])),
          new Aspect('Troubling Troubles', new Set<string>(['trouble']))
        ]),
        new Map<string, number>()
        );

  findAll(): Promise<Character[]> {
    return new Promise<Character[]>((resolve, reject) => {
      var fooBars = Array.from({length: 4}, () => this.fooBar);
      resolve(this.fixedCharacters.concat(fooBars));
    });
  }

}


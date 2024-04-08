enum Commands {
  PING = 'PING',
  ECHO = 'ECHO',
}

const parse = (data: string): [Commands, string][] => {
  const keys = data
    .trim()
    .split('\r\n')
    .slice(1)
    .filter((_, i) => i % 2);
  const commands: [Commands, string][] = [];
  for (let i = 0; i < keys.length; i += 2) {
    commands.push([keys[i] as Commands, keys[i + 1]]);
  }
  return commands;
};

export { parse as default, Commands };

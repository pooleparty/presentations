useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  // Effect will only be fired when `props.source` changes
  [props.source],
);
